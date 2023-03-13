const SimpleDic = [
    [' ',			''],		// Space 
    ['$',			''],		// Money 
    //['\\cdot',	'\u22C5'],	// multiplication ⋅
    ['\\cdot',		'*'],	    // multiplication *
    ['\\oplus',		'\u2295'],	// XOR ⊕
    ['\\bigoplus',	'\u2295'],	// XOR ⊕
    ['\\odot',		'\u2299'],	// XNOR ⊙
    ['\\bigodot',	'\u2299'],	// XNOR ⊙
]

const BracketDic = [
    ["\\overline{","}",     "~(",")",   "{","}"],   // overline         [BeforeStart,BeforeEnd,  AfterStart,AfterEnd,  CheckOpening,CheckClosing]
    ["\\bar{","}",          "~(",")",   "{","}"],   // overline
    ["\\left(","\\right)",  "(",")",    "(",")"],   // parentheses
    ["\\left[","\\right]",  "[","]",    "[","]"],   // brackets
    
    ["\\text{","}",         "","",      "{","}"],   // Tex artifact TEXT
    ["\\boldsymbol{","}",   "","",      "{","}"],   // Tex artifact BOLD
    ["\\textbf{","}",       "","",      "{","}"],   // Tex artifact BOLD
    ["\\mathbf{","}",       "","",      "{","}"],   // Tex artifact BOLD
    ["\\textit{","}",       "","",      "{","}"],   // Tex artifact ITALIC
    ["\\mathit{","}",       "","",      "{","}"],   // Tex artifact ITALIC
    ["\\textrm{","}",       "","",      "{","}"],   // Tex artifact ROMAN
    ["\\mathrm{","}",       "","",      "{","}"],   // Tex artifact ROMAN
    ["\\textsf{","}",       "","",      "{","}"],   // Tex artifact SANS-SERIF
    ["\\mathsf{","}",       "","",      "{","}"],   // Tex artifact SANS-SERIF
    ["\\textsl{","}",       "","",      "{","}"],   // Tex artifact SLANTED
    ["\\texttt{","}",       "","",      "{","}"],   // Tex artifact MONOSPACE
    ["\\textsc{","}",       "","",      "{","}"],   // Tex artifact SMALL CAPS
    ["\\textnormal{","}",   "","",      "{","}"],   // Tex artifact NORMAL
    ["\\mathnormal{","}",   "","",      "{","}"],   // Tex artifact NORMAL
    ["\\textup{","}",       "","",      "{","}"],   // Tex artifact NORMAL
    //["xxx","xxx",  "yyy","yyy",   "zzz","zzz"],
]

var MultipliDic = [
    [')'],    // Left side
    ['(','~'],    // Right side
]
for (let i = 65; i < 91; i++) { // A-Z
    MultipliDic[0].push(String.fromCharCode(i));
    MultipliDic[1].push(String.fromCharCode(i));
}
for (let i = 97; i < 123; i++) { // a-z
    MultipliDic[0].push(String.fromCharCode(i));
    MultipliDic[1].push(String.fromCharCode(i));
}





function convertEquation(equation, CheckOutside = true) {
    
    if (CheckOutside) {
        equation = CheckDollarSign(equation); //Remove any text outside text inside $ signs
    }
    function CheckDollarSign(str) {
        let insideDollarSign = false;
        let result = '';
    
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '$') {
                insideDollarSign = !insideDollarSign;
                result += '$'; // Add the dollar sign to the result string
            } else if (insideDollarSign) {
                result += str[i]; // Add characters inside dollar signs to the result string
            } else if (str[i] === '\n') {
                result += '\n'; // Add line breaks to the result string
            }
        }
    
        return result;
    }



    equation = ReplaceSimple(equation, SimpleDic);               // SimpleDic
    function ReplaceSimple(str, Dic) {
        for (let i = 0; i < str.length; i++) {
            for (let j = 0; j < Dic.length; j++) {
                if (str.startsWith(Dic[j][0], i)) {
                    str = str.substring(0, i) + Dic[j][1] + str.substring(i + Dic[j][0].length);
                    i -= 1; // to check again if the new char is also in the dictionary
                }
            }
        }
        return str;
    }


    equation = ReplaceBracket(equation, BracketDic);             // BracketDic
    function ReplaceBracket(str, Dic) {
        for (let i = 0; i < str.length; i++) {
            for (let j = 0; j < Dic.length; j++) {
                if (str.startsWith(Dic[j][0], i)) {
                    
                    str = str.substring(0, i) + Dic[j][2] + str.substring(i + Dic[j][0].length); //GOOD
                    
                    let BrackIndex = 0;
                    for (let k = i + 1; k < str.length; k++) {     // k = i+1 to skip the first bracket that was converted
                        if (str.startsWith(Dic[j][4], k)) {        // if '('  --> index +1
                            BrackIndex += 1;
                        } 
                        if (BrackIndex <= 0 && str.startsWith(Dic[j][1], k)) {  // if '\\right)' and BrackIndex = 0 --> convert
                            str = str.substring(0, k) + Dic[j][3] + str.substring(k + Dic[j][1].length);
                            break;
                        }
                        if (str.startsWith(Dic[j][5], k)) {        // if ')'  --> index -1
                            BrackIndex -= 1;
                        }
                    }
                    i -= 1;
                }
            }
        }
        return str;
    }

    equation = ReplaceMultipli(equation, MultipliDic);           // MultipliDic
    function ReplaceMultipli(str, Dic) {
        for (let i = 0; i < str.length; i++) { 

            for (let j = 0; j < Dic[0].length; j++) {   //loops ~2862 times :|
                for (let k = 0; k < Dic[1].length; k++) { 
                    if (str.startsWith(Dic[0][j], i) && str.startsWith(Dic[1][k], i+1)) {
                        // str = Dic[0][j] + '*' + Dic[1][k]
                        str = str.substring(0, i) + Dic[0][j] + '*' + Dic[1][k] + str.substring(i + 2);
                        //i -= 1;				//BRUH
                    }
                }
            }

        }
        return str;
    }



	console.log('----\nOUTPUT:\n' + equation + '\n----');
	
    return equation;
}
