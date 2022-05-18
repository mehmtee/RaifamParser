class RaifamParser {
    constructor(string,trim=false,json=false) {
        if (!(string && typeof string == 'string')) return console.log("Parameter 1 Must be valid string !")



        this.trim = trim
        this.string = string;
        this.recordType = this.getRecordType();

        if (this.recordType == false || this.string.length > 466) {
            return console.log("Invalid string")
        }

        this.json = json
    }

    getHeaderRecordKeys(){
        return [
            "typeRecordRecordCode",
            "fileReferenceNumber",
            "fileType",
            "versionNumber",
            "fileType",
            "fileReleaseDateCreationDate",
            "effectiveDate",
            "endDate",
            "eanNumberOfTheSupplier",
            "supplierName",
            "contentOfTheFile",
            "itemGroupCode",
            "famCodeOfTheBrand",
            "managementInformation",
            "controlTotalPrice",
            "numberOfItemRecords",
            "addressSupplier",
            "placeName",
            "postcode",
            "land",
            "valutacode",
            "unused",
            "cr",
            "lf",
            
        ]
    }

    getArticleRecordKeys(){
        return [
            "typeRecordRecordCode",
            "articleNumber1",
            "articleNumber1Identifies",
            "articleNumber2",
            "articleNumber2Identifies",
            "articleNumber3",
            "articleNumber3Identifies",
            "courantcode",
            "courantcode",
            "courantcode",
            "statuscode",
            "returncode",
            "definition",
            "additionalDescription",
            "languageCode",
            "descriptionOfTheArticleInSecondLanguage",
            "additionalDescriptionInSecondLanguage",
            "languageCodeAdditionalLanguage",
            "priceI",
            "priceTypeI",
            "priceTypeIdentification",
            "discountCodePriceI",
            "minimumOrderQuantity",
            "numberOfPiecesInPriceUnit1",
            "unitInPrice1",
            "numberOfPiecesPerPackage",
            "packagingType",
            "price2",
            "priceType2",
            "priceTypeIdentification2",
            "discountCodePrice2",
            "numberOfPiecesInPriceUnit2",
            "unitInPrice2",
            "btwPercentage",
            "disposalFee",
            "deposit",
            "grossWeight",
            "netWeight",
            "packagingMaterial",
            "height",
            "length",
            "width",
            "articleNumber4",
            "articleNumber4Identifies",
            "safetyClass",
            "environmentalSurcharge",
            "intrastatNumberCustomsTariff",
            "famClassification",
            "productGroupAtTheSupplier",
            "cr",
            "lf",
            ""
        ]
    }

    getRecordType() {
        let type = this.string[0];
        if (type == 'H' || 1) {
            return type;
        }
        return false
    }

    pairingResult(keys,values){
     
        let object = {};

        values.forEach((item,index) => object[keys[index].toString()] = item )
        return object


    }


    parse() {
        let parsed = null;
        let recordKeys = null
        if (this.recordType == 'H') {
            parsed =  this.__parseH();
            recordKeys = this.getArticleRecordKeys()
        } else if (this.recordType == 'P') {
            parsed = this.__parseP()
            recordKeys = this.getArticleRecordKeys()
        }

        if(this.json){
            parsed = this.pairingResult(recordKeys,parsed);
        }

        return parsed



    }
    __parseH() {
        const arr = []

        arr.push(this.string.substring(0, 1));
        arr.push(this.string.substring(1, 13));
        arr.push(this.string.substring(13, 19));
        arr.push(this.string.substring(19, 20));
        arr.push(this.string.substring(20, 22));
        arr.push(this.string.substring(22, 30));
        arr.push(this.string.substring(30, 38));
        arr.push(this.string.substring(38, 46));
        arr.push(this.string.substring(46, 59));
        arr.push(this.string.substring(59, 94));
        arr.push(this.string.substring(94, 129));
        arr.push(this.string.substring(129, 133));
        arr.push(this.string.substring(133, 137));
        arr.push(this.string.substring(137, 138));
        arr.push(this.string.substring(138, 153));
        arr.push(this.string.substring(153, 159));
        arr.push(this.string.substring(159, 194));
        arr.push(this.string.substring(194, 229));
        arr.push(this.string.substring(229, 238));
        arr.push(this.string.substring(238, 241));
        arr.push(this.string.substring(241, 244));
        arr.push(this.string.substring(244, 464));
       
        return this.trim ?  arr.map(e => e.trim()) : arr;
    }

    __parseP() {

        const arr = []
        arr.push(this.string.substring(0, 1));      //1     P
        arr.push(this.string.substring(1, 26));     //2     REF1
        arr.push(this.string.substring(26, 29));    //3     REFTYPE1
        arr.push(this.string.substring(29, 54));    //4     REF2
        arr.push(this.string.substring(54, 57));    //5     REFTYPE2
        arr.push(this.string.substring(57, 82));    //6     REF3
        arr.push(this.string.substring(82, 85));    //7     REFTYPE3
        arr.push(this.string.substring(85, 86));    //8.1   POPULARITY
        arr.push(this.string.substring(86, 87));    //8.2   POP_ADD
        arr.push(this.string.substring(87, 88));    //8.3   USELESS
        arr.push(this.string.substring(88, 89));    //9     STATUSCODE
        arr.push(this.string.substring(89, 90));    //10    RETOURCODE
        arr.push(this.string.substring(90, 125));   //11    DESC
        arr.push(this.string.substring(125, 160));  //
        arr.push(this.string.substring(160, 163));
        arr.push(this.string.substring(163, 198));
        arr.push(this.string.substring(198, 233));
        arr.push(this.string.substring(233, 235));
        arr.push(this.string.substring(235, 250));
        arr.push(this.string.substring(250, 253));
        arr.push(this.string.substring(253, 256));
        arr.push(this.string.substring(256, 259));
        arr.push(this.string.substring(259, 265));
        arr.push(this.string.substring(265, 271));
        arr.push(this.string.substring(271, 274));
        arr.push(this.string.substring(274, 280));
        arr.push(this.string.substring(280, 283));
        arr.push(this.string.substring(283, 298));
        arr.push(this.string.substring(298, 301));
        arr.push(this.string.substring(301, 304));
        arr.push(this.string.substring(304, 307));
        arr.push(this.string.substring(307, 313));
        arr.push(this.string.substring(313, 316));
        arr.push(this.string.substring(316, 320));
        arr.push(this.string.substring(320, 335));
        arr.push(this.string.substring(335, 350));
        arr.push(this.string.substring(350, 358));
        arr.push(this.string.substring(358, 366));
        arr.push(this.string.substring(366, 369));
        arr.push(this.string.substring(369, 377));
        arr.push(this.string.substring(377, 385));
        arr.push(this.string.substring(385, 393));
        arr.push(this.string.substring(393, 418));
        arr.push(this.string.substring(418, 421));
        arr.push(this.string.substring(421, 424));
        arr.push(this.string.substring(424, 439));
        arr.push(this.string.substring(439, 447));
        arr.push(this.string.substring(447, 451));
        arr.push(this.string.substring(451, 464));
        return this.trim ?  arr.map(e => e.trim()) : arr;
    }

}


module.exports = RaifamParser;