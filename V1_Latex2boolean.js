function convertEquation(equation) {
	let SimpleDic = [
		[' ',			''],
		['\\cdot',		'⋅'],	// multiplication
		['\\oplus',		'⊕'],	// XOR
		['\\bigoplus',	'⊕'],	// XOR
		['\\odot',		'⊕'],	// XNOR
		['\\bigodot',	'⊕']	// XNOR
	]

	let BracketDic = [
        ["\\overline{","}",     "~(",")",   "{","}"],   // overline         [BeforeStart,BeforeEnd,  AfterStart,AfterEnd,  CheckOpening,CheckClosing]
        ["\\left(","\\right)",  "(",")",   "(",")"]     // parentheses
	]
	
	for (let i = 0; i < equation.length; i++) {		// SimpleDic
		for (let j = 0; j < SimpleDic.length; j++) {
			if (equation.startsWith(SimpleDic[j][0], i)) {
				equation = equation.substring(0, i) + SimpleDic[j][1] + equation.substring(i + SimpleDic[j][0].length);
                i -= 1; // to check again if the new char is also in the dictionary
			}
		}
	}

    for (let i = 0; i < equation.length; i++) {		// BracketDic
        for (let j = 0; j < BracketDic.length; j++) {
            if (equation.startsWith(BracketDic[j][0], i)) {
                
                equation = equation.substring(0, i) + BracketDic[j][2] + equation.substring(i + BracketDic[j][0].length); //GOOD
                
                let BrackIndex = 0;
                for (let k = i + 1; k < equation.length; k++) {     // k = i+1 to skip the first bracket that was converted
                    if (equation.startsWith(BracketDic[j][4], k)) { // if '('  --> index +1
                        BrackIndex += 1;
                    } 
                    if (BrackIndex <= 0 && equation.startsWith(BracketDic[j][1], k)) {  // if '\\right)' and BrackIndex = 0 --> convert
                        equation = equation.substring(0, k) + BracketDic[j][3] + equation.substring(k + BracketDic[j][1].length);
                        break;
                    }
                    if (equation.startsWith(BracketDic[j][5], k)) { // if ')'  --> index -1
                        BrackIndex -= 1;
                    }
                }
                i -= 1; // to check again if the new char is also in the dictionary
            }
        }
    }

	console.log('---- OUTPUT: ' + equation + ' ----');
	
    return equation;
}
