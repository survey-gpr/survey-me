import {BoundItemBase} from "./BoundItemBase";
import {UkuleleUtil} from "../util/UkuleleUtil";
import {Selector} from "../extend/Selector";
import {IUkulele} from "../core/IUkulele";
export class BoundItemExpression extends BoundItemBase{
    expression:string;
    constructor(attrName:string, expression:string, element:HTMLElement, uku:IUkulele){
        super(attrName,element,uku);
        this.expression = expression;
    }

    render(controllers) :void{
        let finalValue = UkuleleUtil.getFinalValue(controllers,this.attributeName);
        Selector.directText(this.element,finalValue);
    }
}
