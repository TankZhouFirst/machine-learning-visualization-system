/*
    检查类型是否匹配
*/



/*
    类型匹配汇总
    函数输入两个参数，分别为：
    value_str : 值字符串
    expected_type_str ： 期望的类型字符串
    //

*/
function Check_parms_Type(value_str, expected_type_str){
    switch(expected_type_str){
        case "Boolean" : {                                 // bool 值
            return Is_Boolean(value_str);
        }
        case "Positive_Integer" : {                        // 正整数
            return Is_Positive_Integer(value_str);
        }
        case "Non_Negative_Integer" : {                    // 非负整数
            return Is_Non_Positive_Integer(value_str);
        }
        case "PI_Or_(x,x)" : {                             // 正整数或者二元 tuple(正整数)
            return Is_PI_Or_2D_PI_Tuple(value_str);
        }
        case "NNI_Or_(x,x)" : {                            // 非负整数或者二元 tuple(非负整数)
            return Is_NNI_Or_2D_NNI_Tuple(value_str);
        }
        case "PI_Or_(x,x,x)" : {                           // 正整数或者三元 tuple(正整数)
            return Is_PI_Or_3D_PI_Tuple(value_str);
        }
        case "NNI_Or_(x,x,x)" : {                          // 非负整数或者三元 tuple(非负整数)
            return Is_NNI_Or_3D_NNI_Tuple(value_str);
        }
        case "Real_(0,inf)" : {                            // 正实数
            return Is_Positive_Real_Value(value_str);
        }
        case "Real_value" : {                              // 实数
            return Is_Real_Value(value_str);
        }
        case "NNI_or_None" : {                             // 非负整数或者 None
            return Is_NNI_or_None(value_str);
        }
        case "Real_(0,1)" : {                              // (0,1) 之间的小数
            return Is_Real_Value_0_1(value_str);
        }
        case "PI_List_[N,*]" : {                             // list
            return Is_PI_List(value_str);
        }
        case "NNI_Or_(x,x,x,x)" : {                        // 正整数或者四元 tuple(正整数)
            return Is_NNI_Or_4D_NNI_Tuple(value_str);
        }
        case "NNI_Or_(x,x,x,x,x,x)" : {                    // 正整数或者六元 tuple(正整数)
            return Is_NNI_Or_6D_NNI_Tuple(value_str);
        }
        case "PI_or_None" : {                              // 正整数或者 None
            return Is_PI_or_None(value_str);
        }
        case "PI_Or_(x,x)_or_None" : {                     // 正整数或者二元 tuple(正整数) 或者 None
            return Is_PI_Or_2D_PI_Tuple_Or_None(value_str);
        }
        case "PI_Or_(x,x,x)_or_None" : {                   // 正整数或者三元 tuple(正整数) 或者 None
            return Is_PI_Or_3D_PI_Tuple_Or_None(value_str);
        }
        case "Real_(0,1)_or_(x,x)_or_None" : {             // 正纯小数或者三元 tuple(正纯小数) 或者 None
            return Is_Real_Value_0_1_Or_2D_tuple_or_None(value_str);
        }
        case "PI_or_(x,*)_or_(*,x)" : {                    // 正整数或者 (x,*) 或者 (*,x)，其中 * 表示 PI 或者 None
            return Is_PI_Or_xq_Or_qx(value_str);
        }
        case "PI_or_(x,*,*)_or_(*,x,*)_or_(*,*,x)" : {     // 正整数或者 (x,*,*) 或者 (*,x,*) 或者 (*,*,x)，其中 * 表示 PI 或者 None
            return Is_PI_Or_xqq_Or_qxq_Or_qqx(value_str);
        }
        case "PI_List_[N_or_-1,*]" : {                     // list
            return Is_Batch_PI_List(value_str);
        }
        case "PI_Or_(x,x,x,x)" : {                        // 正整数或者四元 tuple(正整数)
            return Is_PI_Or_4D_PI_Tuple(value_str);
        }
        case "[N, C, Hout]" : {                           // [N, C, Hout]
            return Is_PI_and_3D_List(value_str);
        }
        case "[N, C, Hout, Wout]" : {                     // [N, C, Hout, Wout]
            return Is_PI_and_4D_List(value_str);
        }
        case "[N, C, Dout, Hout, Wout]" : {               // [N, C, Dout, Hout, Wout]
            return Is_PI_and_5D_List(value_str);
        }
        default : return "Error";
    }
}



/*
    是否为 bool 类型
*/
function Is_Boolean(value_str){

    // 不匹配
    if(value_str.trim() != "True" && value_str.trim() != "False"){
        return "True or False is expected!";
    }

    // 匹配
    return "";
}



/*
    检查是否为正整数
*/
function Is_Positive_Integer(value_str){
    let reg = /^\+?\s*[1-9][0-9]*$/;
    
    if(! reg.test(value_str.trim())){
        return "Positive integer is expected!";
    }

    return "";
}



/*
    检查是否为非负整数
*/
function Is_Non_Positive_Integer(value_str){
    let reg = /(^\+?\s*[1-9][0-9]*$)|(^[\+\-]?\s*0$)/;
    
    if(! reg.test(value_str.trim())){
        return "Non-positive integer is expected!";
    }
    return "";
}



/*
    正整数或二元 tuple（正整数）
*/
function Is_PI_Or_2D_PI_Tuple(value_str){
    // 如果为正整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    //  否则在此判断是否为 (x,x)
    let reg = /^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\)$/;
    if(! reg.test(value_str.trim())){
        return "Positive integer or binary tuple(positive integer) is expected!";
    }

    return "";
}



/*
    非负整数或二元 tuple（非负整数）
*/
function Is_NNI_Or_2D_NNI_Tuple(value_str){
    // 如果为非负整数
    if(Is_Non_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    // 首先检查是否为 2 元 tuple
    let reg = /^\(\s*[\+\-]?\s*[0-9]*\s*,\s*[\+\-]?\s*[0-9]*\s*\)$/;
    if(!reg.test(value_str.trim())){
        return "Non-positive integer or binary tuple(Non-positive integer) is expected!";
    }

    // 如果为 tuple，再进行分割，分别检查每个元素是否为非负数
    let str1 = value_str.trim().split(",")[0];
    let parm1 = str1.substr(1,str1.length);      // 去掉 "("
    let str2 = value_str.trim().split(",")[1]; 
    let parm2 = str2.substr(0,str2.length-1);    // 去掉 ")"

    if(Is_Non_Positive_Integer(parm1) != "" || Is_Non_Positive_Integer(parm2) != ""){
        return "Non-positive integer or binary tuple(Non-positive integer) is expected!";
    }

    return "";
}



/*
    正整数或三元 tuple（正整数）
*/
function Is_PI_Or_3D_PI_Tuple(value_str){
    // 如果为正整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    //  否则在此判断是否为 (x,x,x)
    let reg = /^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\,\s*\+?\s*[1-9][0-9]*\s*\)$/;
    if(! reg.test(value_str.trim())){
        return "Positive integer or three-element tuple(positive integer) is expected!";
    }

    return "";
}



/*
    非负整数或三元 tuple（非负整数）
*/
function Is_NNI_Or_3D_NNI_Tuple(value_str){
    // 如果为非负整数
    if(Is_Non_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    // 首先检查是否为 3 元 tuple
    let reg = /^\(\s*[\+\-]?\s*[0-9]*\s*,\s*[\+\-]?\s*[0-9]*\s*,\s*[\+\-]?\s*[0-9]*\s*\)$/;
    if(!reg.test(value_str.trim())){
        return "Non-positive integer or three-element tuple(Non-positive integer) is expected!";
    }

    // 如果为 tuple，再进行分割，分别检查每个元素是否为非负数
    let str1 = value_str.trim().split(",")[0];
    let parm1 = str1.substr(1,str1.length);      // 去掉 "("

    let parm2 = value_str.trim().split(",")[1];
    
    let str3 = value_str.trim().split(",")[2]; 
    let parm3 = str3.substr(0,str3.length-1);    // 去掉 ")"

    if(Is_Non_Positive_Integer(parm1) != "" || Is_Non_Positive_Integer(parm2) != ""  || Is_Non_Positive_Integer(parm3) != ""){
        return "Non-positive integer or three-element tuple(Non-positive integer) is expected!";
    }

    return "";
}



/*
    正实数
*/
function Is_Positive_Real_Value(value_str){
    let reg1 = /^[\+]?\s*0\.\d+$|^[\+]?\s*[1-9]+(\.\d+)?$/;
    let reg2 = /^[\+]?\s*[1-9]+(.[0-9]+)e[\+\-]?0*[1-9]+\s*$/;
    
    if((! reg1.test(value_str.trim())) && (! reg2.test(value_str.trim()))){
        return "Positive real value is expected!";
    }

    return "";
}



/*
    实数
*/
function Is_Real_Value(value_str){
    let reg1 = /^[\+\-]?\s*0(\.\d+)?$|^[\+\-]?\s*[1-9]+(\.\d+)?$/;
    let reg2 = /^[\+\-]?\s*[1-9]+(.[0-9]+)?e[\+\-]?0*[1-9]+\s*$/;
    
    if((! reg1.test(value_str.trim())) && (! reg2.test(value_str.trim()))){
        return "Real value is expected!";
    }

    return "";
}



/*
    非负整数或者 None
*/
function Is_NNI_or_None(value_str){
    // 如果为非负整数
    if(Is_Non_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    if(value_str.trim() == "None"){
        return "";
    }

    return "Non-positive integer or None is expected!"
}



/*
    (0,1) 之间的小数
*/
function Is_Real_Value_0_1(value_str){
    let reg1 = /^[\+]?\s*0\.\d+$/;
    let reg2 = /^[\+]?\s*[1-9](.[0-9]+)?e\-0*[1-9]+\s*$/;
    
    if((! reg1.test(value_str.trim())) && (! reg2.test(value_str.trim()))){
        return "Positive real value in (0,1) is expected!";
    }

    return "";
}



/*
    list，其中每个元素均为正整数
*/
function Is_PI_List(value_str){
    let reg = /^\[\s*\+?\s*[1-9][0-9]*\s*(,\s*\+?\s*[1-9][0-9]*\s*)+\]$/;

    if(! reg.test(value_str.trim())){
        return "Positive integer list (eg: [1,2]) is expected!";
    }

    return "";
}



/*
    非负整数或四元 tuple（非负整数）
*/
function Is_NNI_Or_4D_NNI_Tuple(value_str){
    // 如果为非负整数
    if(Is_Non_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    // 首先检查是否为 4 元 tuple
    let reg = /^\(\s*[\+\-]?\s*[0-9]*\s*(,\s*[\+\-]?\s*[0-9]*\s*){3}\)$/;
    if(!reg.test(value_str.trim())){
        return "Non-positive integer or four-element tuple(Non-positive integer) is expected!";
    }

    // 如果为 tuple，再进行分割，分别检查每个元素是否为非负数
    let str1 = value_str.trim().split(",")[0];
    let parm1 = str1.substr(1,str1.length);      // 去掉 "("

    let parm2 = value_str.trim().split(",")[1];
    let parm3 = value_str.trim().split(",")[2];
    
    let str4 = value_str.trim().split(",")[3]; 
    let parm4 = str4.substr(0,str4.length-1);    // 去掉 ")"

    if(Is_Non_Positive_Integer(parm1) != "" || Is_Non_Positive_Integer(parm2) != ""  || 
                                                Is_Non_Positive_Integer(parm3) != "" || Is_Non_Positive_Integer(parm4) != ""){
        return "Non-positive integer or four-element tuple(Non-positive integer) is expected!";
    }

    return "";
}



/*
    非负整数或六元 tuple（非负整数）
*/
function Is_NNI_Or_6D_NNI_Tuple(value_str){
    // 如果为非负整数
    if(Is_Non_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    // 首先检查是否为 6 元 tuple
    let reg = /^\(\s*[\+\-]?\s*[0-9]*\s*(,\s*[\+\-]?\s*[0-9]*\s*){5}\)$/;
    if(!reg.test(value_str.trim())){
        return "Non-positive integer or six-element tuple(Non-positive integer) is expected!";
    }

    // 如果为 tuple，再进行分割，分别检查每个元素是否为非负数
    let str1 = value_str.trim().split(",")[0];
    let parm1 = str1.substr(1,str1.length);      // 去掉 "("

    let parm2 = value_str.trim().split(",")[1];
    let parm3 = value_str.trim().split(",")[2];
    let parm4 = value_str.trim().split(",")[3];
    let parm5 = value_str.trim().split(",")[4];
    
    let str6 = value_str.trim().split(",")[5]; 
    let parm6 = str6.substr(0,str6.length-1);    // 去掉 ")"

    if(Is_Non_Positive_Integer(parm1) != "" || Is_Non_Positive_Integer(parm2) != ""  || Is_Non_Positive_Integer(parm3) != "" 
            || Is_Non_Positive_Integer(parm4) != "" || Is_Non_Positive_Integer(parm5) != ""  || Is_Non_Positive_Integer(parm6) != ""){
        return "Non-positive integer or six-element tuple(Non-positive integer) is expected!";
    }

    return "";
}



/*
    非负整数或者 None
*/
function Is_PI_or_None(value_str){
    // 如果为非负整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    if(value_str.trim() == "None"){
        return "";
    }

    return "Positive integer or None is expected!"
}



/*
    正整数或二元 tuple（正整数）
*/
function Is_PI_Or_2D_PI_Tuple_Or_None(value_str){
    // 如果为正整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    if(value_str.trim() == "None"){
        return "";
    }

    //  否则在此判断是否为 (x,x)
    let reg = /^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\)$/;
    if(! reg.test(value_str.trim())){
        return "Positive integer or binary tuple(positive integer) or None is expected!";
    }

    return "";
}



/*
    正整数或三元 tuple（正整数）或者 None
*/
function Is_PI_Or_3D_PI_Tuple_Or_None(value_str){
    // 如果为正整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    if(value_str.trim() == "None"){
        return "";
    }

    //  否则在此判断是否为 (x,x,x)
    let reg = /^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\)$/;
    if(! reg.test(value_str.trim())){
        return "Positive integer or three-element tuple(positive integer) or None is expected!";
    }

    return "";
}



/*
    (0,1) 之间的小数或者 tuple 或者 None
*/
function Is_Real_Value_0_1_Or_2D_tuple_or_None(value_str){
    // 实数？
    if(Is_Real_Value_0_1(value_str) == ""){
        return "";
    }

    if(value_str.trim() == "None"){
        return "";
    }

    if(value_str.trim()[0] == "("){
        let str = value_str.trim();
        str = str.substr(1,str.length-2);
        let p1 = str.split(",")[0].trim();
        let p2 = str.split(",")[1].trim();

        if((Is_Real_Value_0_1(p1) == "") && (Is_Real_Value_0_1(p2) == "")){
            return "";
        }
    }

    return "Positive real value in (0,1) or binary tuple(positive real) or None is expected!";
}



/*
    正整数或二元 tuple（正整数），其中最多只能有一个为 None
*/
function Is_PI_Or_xq_Or_qx(value_str){
    // 如果为正整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    //  否则在此判断是否为 (x,x)
    let reg = /^\(\s*\+?\s*[1-9][0-9]*\s*,\s*None\s*\)$|^\(\s*None\s*,\s*\+?\s*[1-9][0-9]*\s*\)$|^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\)$/;

    if(! reg.test(value_str.trim())){
        return "Positive integer or binary tuple(positive integer, one element but not all can be None) is expected!";
    }

    return "";
}


/*
    正整数或二元 tuple（正整数），其中最多只能有一个为 None
*/
function Is_PI_Or_xqq_Or_qxq_Or_qqx(value_str){
    // 如果为正整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    if(/^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\)$/.test(value_str.trim())){   //  (PI, PI, PI)
        return "";
    }

    if(/^\(\s*None\s*\,\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\)$/.test(value_str.trim())){               //  (None, PI, PI)
        return "";
    }

    if(/^\(\s*\+?\s*[1-9][0-9]*\s*,\s*None\s*\,\s*\+?\s*[1-9][0-9]*\s*\)$/.test(value_str.trim())){              //  (PI, None, PI)
        return "";
    }

    if(/^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*,\s*None\s*\)$/.test(value_str.trim())){               //  (PI, PI, None)
        return "";
    }

    if(/^\(\s*\+?\s*[1-9][0-9]*\s*,\s*None\s*\,\s*None\s*\)$/.test(value_str.trim())){                           //  (PI, None, None)
        return "";
    }

    if(/^\(\s*None\s*\,\s*\+?\s*[1-9][0-9]*\s*,\s*None\s*\)$/.test(value_str.trim())){                           //  (None, PI, None)
        return "";
    }

    if(/^\(\s*None\s*\,\s*None\s*\,\s*\+?\s*[1-9][0-9]*\s*\)$/.test(value_str.trim())){                          //  (None, None, PI)
        return "";
    }

    return "Positive integer or three-element tuple(positive integer, some element but not all can be None) is expected!";
}
    


/*
    list，其中每个元素均为正整数
*/
function Is_Batch_PI_List(value_str){
    let reg = /^\[\s*\+?\s*[1-9][0-9]*\s*(,\s*\+?\s*[1-9][0-9]*\s*)+\]$|^\[\s*\-\s*1\s*(,\s*\+?\s*[1-9][0-9]*\s*)+\]$/;

    if(! reg.test(value_str.trim())){
        return "Positive integer list (at least two elements, eg: [1,2]) is expected!";
    }

    return "";
}



/*
    正整数或四元 tuple（正整数）
*/
function Is_PI_Or_4D_PI_Tuple(value_str){
    // 如果为非负整数
    if(Is_Positive_Integer(value_str.trim()) == ""){
        return "";
    }

    //  否则在此判断是否为 (x,x,x,x)
    let reg = /^\(\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*,\s*\+?\s*[1-9][0-9]*\s*\)$/;
    if(! reg.test(value_str.trim())){
        return "Positive integer or four-element tuple(positive integer) is expected!";
    }

    return "";
}



/*
    [N, C, Hout]
*/
function Is_PI_and_3D_List(value_str){
    //  否则在此判断是否为 [N, C, Hout]
    let reg = /^\[\s*\+?\s*[1-9][0-9]*\s*(,\s*\+?\s*[1-9][0-9]*\s*){2}\]$/;
    if(! reg.test(value_str.trim())){
        return "three-element list is expected!";
    }

    return "";
}



/*
    [N, C, Hout, Wout]
*/
function Is_PI_and_4D_List(value_str){
    //  否则在此判断是否为 [N, C, Hout]
    let reg = /^\[\s*\+?\s*[1-9][0-9]*\s*(,\s*\+?\s*[1-9][0-9]*\s*){3}\]$/;
    if(! reg.test(value_str.trim())){
        return "four-element list is expected!";
    }

    return "";
}



/*
    [N, C, Dout, Hout, Wout]
*/
function Is_PI_and_5D_List(value_str){
    //  否则在此判断是否为 [N, C, Hout]
    let reg = /^\[\s*\+?\s*[1-9][0-9]*\s*(,\s*\+?\s*[1-9][0-9]*\s*){4}\]$/;
    if(! reg.test(value_str.trim())){
        return "five-element list is expected!";
    }

    return "";
}