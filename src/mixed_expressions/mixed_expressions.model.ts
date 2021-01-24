import { Expression } from "src/expressions/expression.model";

export class MixedExpression {
    constructor(
        public id: string,
        public content: string,
        public expression_list: Expression[]
    ) {}
}