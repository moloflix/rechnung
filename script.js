var data = { items: [] };
$(function () {
    $.each(products, function (k, v) {
        $('#pet-select').append(
            `<option value="${v.price}">${v.name}</option>`
        )
    });

    $("#pet-select").change(function () {
        var key = $('#pet-select').find(":selected").val();
        $('#input').hide();
        if (key == '0') {
            $("#price").val('');
        } else if (key == '-1') {
            $("#price").val('');
            $("#input").val('');
            $('#input').show();
        } else {
            $("#price").val(key);
        }
    }).change();

    $("#add").click(function () {
        var key = $('#pet-select').find(":selected").val();
        var name = $('#pet-select').find(":selected").text();
        var price = $("#price").val();
        if (key == '0') {
            console.log("يرجى اختيار شيئ من القائمة")
        } else if (key == '-1') {
            var name = $('#input').val();
            data.items.push({ id: name + price, name: name, price: price });
            $('.products').append(
                `<div data-id = "${name + price}" id="product">
                <i id="remove" class="fa-regular fa-square-minus"></i>
                <p class="item name">${name}</p>
                <p class="item">${price}</p>
                <p class="item">1x</p>
                </div>`
            )
            $('#input').hide();
        } else {
            data.items.push({ id: name + price, name: name, price: price });
            $('.products').append(
                `<div data-id = "${name + price}" id="product">
                <i id="remove" class="fa-regular fa-square-minus"></i>
                <p class="item name">${name}</p>
                <p class="item">${price}</p>
                <p class="item">1x</p>
                </div>`
            )
        }
        $("[id=remove]").click(function (ev) {
            ev.preventDefault();
            $(this).parent().remove()
            var Div = $(this).parent();
            var getID = Div.data("id")
            data.items.splice(data.items.findIndex(({id}) => id == getID), 1);
        });
        $("#pet-select").val(0)
        $("#price").val('');
    });

    $(".print").click(function () {
        PrintElem()
    });
});

function PrintElem() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    var products = ""
    var total = 0
    $.each(data.items, function (key, value) {
        products = products + `<tr>
        <td class="quantity">1</td>
        <td class="description">${value.name}</td>
        <td class="price">${value.price} €</td>
    </tr>`
        total = total + parseInt(value.price)
    });
    var mwst = total * 0.19
    console.log(total - mwst)
    console.log(total)
    console.log(mwst)
    $html = `<div class="ticket">
<img src="./receipt/logo.png" alt="Logo">
<p class="centered">Pankstr. 46
    <br>13357 Berlin
    <br>Tel : 03056000195</p>
    <table class="tab">
        <p class="bar">Bar Beleg</p>
        <div class="centerDiv">
            <p class="date">Date : </p>
            <p class="date">${today}</p>
        </div>
        <thead>
        <tr>
            <th class="quantity">Mge</th>
            <th class="description">Artikel</th>
            <th class="price">Preis</th>
        </tr>
    </thead>
    <tbody>
        ${products}
    </tbody>
</table>

<table class="secTab">
    <thead>
        <tr>
            <td class="secTable">%MwSt.</td>
            <td class="secTable">Netto</td>
            <td class="secTable">MwSt.</td>
            <td class="secTable">Brutto</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="secTable">19%</td>
            <td class="secTable">${total - mwst.toFixed(2)} €</td>
            <td class="secTable">${mwst.toFixed(2)} €</td>
            <td class="secTable">${total} €</td>
        </tr>
    </tbody>
</table>
<div class="centerDiv">
    <p class="total">Summe : </p>
    <p class="total">${total} EUR</p>
</div>
<p class="footer">Danke für Ihren Einkauf
    <br>Auf Wiedersehen!</p>
</div>`;
    Popup($html);
}

function Popup(data) {
    var myWindow = window.open('', 'Receipt', 'height=400,width=600');
    myWindow.document.write('<html><head><title>Receipt</title>');
    myWindow.document.write('<link rel="icon" href="fav.ico">');
    myWindow.document.write('<link rel="stylesheet" href="./receipt/style.css">');
    myWindow.document.write('<style type="text/css"> *, html {margin:3;padding:0;} </style>');
    myWindow.document.write('</head><body>');
    myWindow.document.write(data);
    myWindow.document.write('</body></html>');
    myWindow.document.close(); // necessary for IE >= 10
    myWindow.onload = function () { // necessary if the div contain images
        myWindow.print();
        myWindow.close();
    };
}
