let currency = "USD";
let coinData = {};

//API Call
var apiCall = function() {
    $.ajax({
    url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=XVG&tsyms=USD,BTC,EUR',
    type: 'GET',
    data: 'json',
    dataType: 'json',
    success: function (data) {
    console.log(data);
        // USD
        coinData.XVGPriceUSD = data.DISPLAY.XVG.USD.PRICE;
        coinData.XVGChangeUSD = data.DISPLAY.XVG.USD.CHANGEPCTDAY;
        coinData.XVGPlaceUSD = data.DISPLAY.XVG.USD.LASTMARKET;
        coinData.XVGTimeUSD = data.DISPLAY.XVG.USD.LASTUPDATE;
        // EUR
        coinData.XVGPriceEUR = data.DISPLAY.XVG.EUR.PRICE;
        coinData.XVGChangeEUR = data.DISPLAY.XVG.EUR.CHANGEPCTDAY;
        coinData.XVGPlaceEUR = data.DISPLAY.XVG.EUR.LASTMARKET;
        coinData.XVGTimeEUR = data.DISPLAY.XVG.EUR.LASTUPDATE;
        // BTC
        coinData.XVGPriceBTC = data.DISPLAY.XVG.BTC.PRICE;
        coinData.XVGChangeBTC = data.DISPLAY.XVG.BTC.CHANGEPCTDAY;
        coinData.XVGPlaceBTC = data.DISPLAY.XVG.BTC.LASTMARKET;
        coinData.XVGTimeBTC = data.DISPLAY.XVG.BTC.LASTUPDATE;
        // Display
        changeCurrency();
    },
    error: function (request, error) {
        console.log(error);
    }
});
}

// Make initial call
apiCall();

// Change Currency 
var changeCurrency = function() {
    if (currency == "USD") {
        $(".xvg_price").text(coinData.XVGPriceUSD);
        $(".xvg_change").text(coinData.XVGChangeUSD + "% today");
        $(".xvg_place").text(coinData.XVGPlaceUSD);
        $(".xvg_time").text(coinData.XVGTimeUSD);
    } else if (currency == "EUR") {
        $(".xvg_price").text(coinData.XVGPriceEUR);
        $(".xvg_change").text(coinData.XVGChangeEUR + "% today");
        $(".xvg_place").text(coinData.XVGPlaceEUR);
        $(".xvg_time").text(coinData.XVGTimeEUR);
    } else if (currency == "BTC") {
        $(".xvg_price").text(coinData.XVGPriceBTC);
        $(".xvg_change").text(coinData.XVGChangeBTC + "% today");
        $(".xvg_place").text(coinData.XVGPlaceBTC);
        $(".xvg_time").text(coinData.XVGTimeBTC);
    }
    checkChange();
    console.log("Currency values updated");
}

// Check if negative or positive
var checkChange = function() {
    let xvgChange = parseFloat($(".xvg_change").text());
    if (xvgChange < 0) {
        $(".xvg_change").addClass("bg-red").removeClass("bg-green");
    }
    if (xvgChange > 0) {
        $(".xvg_change").addClass("bg-green");
        $(".xvg_change").removeClass("bg-red");
    }
}

// Click Events 
$('#refresh').click(function(){
    apiCall();
});

$('#usdPill').click(function(){
    currency = "USD";
    $(this).addClass("active");
    $("#eurPill").removeClass("active");
    $("#btcPill").removeClass("active");
    changeCurrency();
});

$('#eurPill').click(function(){
    currency = "EUR";
    $(this).addClass("active");
    $("#usdPill").removeClass("active");
    $("#btcPill").removeClass("active");
    changeCurrency();
});

$('#btcPill').click(function(){
    currency = "BTC";
    $(this).addClass("active");
    $("#usdPill").removeClass("active");
    $("#eurPill").removeClass("active");
    changeCurrency();
});
