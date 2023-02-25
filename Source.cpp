#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

string convertEquation(string& equation) {
	//  123 \\overline{ A + B } 456       --> 123~(A+B)456
	//  HELLO world\\bigoplusxxx          --> HELLOworld⊕xxx
	//  123 \\overline{ A + {B} } 456     --> 123~(A+{B})456

    vector<pair<string, string>> SimpleDic = {
        {" ",           ""},
        {"\\cdot",      "⋅"},
        {"\\oplus",     "⊕"},
        {"\\bigoplus",  "⊕"},
        {"\\odot",      "⊙"},
        {"\\bigodot",   "⊙"}
    };

    vector<vector<string>> BracketDic = {
        {"\\overline{","}",     "~(",")",   "{","}"},   // overline         [BeforeStart,BeforeEnd,  AfterStart,AfterEnd,  CheckOpening,CheckClosing]
        {"\\left(","\\right)",  "(",")",   "(",")"},    // parentheses
    };

    for (size_t i = 0; i < equation.length(); i++) {        // SimpleDic check
        for (size_t j = 0; j < SimpleDic.size(); j++) {
            if (equation.substr(i).find(SimpleDic[j].first) == 0) {
                equation.replace(i, SimpleDic[j].first.length(), SimpleDic[j].second);
                i -= 1;
                break;
            }
        }
    }

	for (size_t i = 0; i < equation.length(); i++) {        // BracketDic check
        for (size_t j = 0; j < BracketDic.size(); j++) {
            if (equation.substr(i).find(BracketDic[j][0]) == 0) {
                equation.replace(i, BracketDic[j][0].length(), BracketDic[j][2]);
                size_t BrackIndex = 0;
                for (size_t k = i + 1; k < equation.length(); k++) {
                    if (equation.substr(k).find(BracketDic[j][4]) == 0) {
                        BrackIndex += 1;
                    }
                    if (BrackIndex <= 0 && equation.substr(k).find(BracketDic[j][1]) == 0) {
                        equation.replace(k, BracketDic[j][1].length(), BracketDic[j][3]);
                        break;
                    }
                    if (equation.substr(k).find(BracketDic[j][5]) == 0) {
                        BrackIndex -= 1;
                    }
                }
                i -= 1;
                break;
            }
        }
    }
    cout << "OUT: " << equation << endl;
	
	return equation;
}