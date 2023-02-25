# Latex2boolean
A Latex to Boolean Algebra converter


### V1:
The code works, the library is not full

it can convert things
- like this: `x=\\overline{A \\cdot \\left( B \\oplus C\\right)+\\overline{\\overline{D}+E}}`
- to this: `x=~(A⋅(B⊕C)+~(~(D)+E))`
