/*
    ** 主要用于文件的相关管理操作
*/
/*************************** global ***************************/
var Prev_Canvas_Stack = [];    // 用于保存进入 block 内部前的现场（支持嵌套）
var Prev_Stack_Len = 0;        // 用于保存嵌套的级数

var Cur_Canvas_Name = "";      // 用于保存当前画布的名称
var Init_Layer_Index = 0;      // 用于保存当前层的起始 layerCounter
var Cur_Block_Id = "";         // 每次双击 block 时，更新它

var Class_Code_Counter = 0;    // 用于生成 className
var Block_Api = "";            // 用于保存 block 对应的 api



/*
    当填入新的名称时，进行更新 canvas 名称
*/
$("#canvas_title").blur(function () {
    if(document.getElementById('canvas_title').value.trim().length > 18){
        alert("Shorter(less than 18) name is required!");
        return;
    }

    if(document.getElementById('canvas_title').value.trim().search("/") != -1){
        alert('No "/" in name!');
        return;
    }

    // 实测为 0，不知道为什么
    if((document.getElementById('canvas_title').value.trim().search(".") != -1) && (document.getElementById('canvas_title').value.trim().search(".") != 0)){
        alert('No "." in name!');
        return;
    }

    if(document.getElementById('canvas_title').value.trim().search("_") != -1){
        alert('No "_" in name!');
        return;
    }

    Cur_Canvas_Name = document.getElementById('canvas_title').value.trim();
});



/*
    清空传入的 SavedLayers 的所有 block 的 api 以及 ClassDefineStr
*/
function Clear_Blocks_Code_Str(SavedLayers){
    // 清空当前所有
    for(let layerIndex = 0, layerLen = SavedLayers.length; layerIndex < layerLen; layerIndex++){
        if(SavedLayers[layerIndex].type == "Block"){
            // 清空相关属性
            SavedLayers[layerIndex].outShape        = [];
            SavedLayers[layerIndex].InShape         = [];
            SavedLayers[layerIndex].api             = "";
            SavedLayers[layerIndex].ClassDefineStr  = "";

            // 清空嵌套层代码
            let LayersArray = [];
            let Layers = SavedLayers[layerIndex].BlockDetails["BlockLayers"];
            if(Layers != ""){
                LayersArray = JSON.parse(Layers);

                Clear_Blocks_Code_Str(LayersArray);

                SavedLayers[layerIndex].BlockDetails["BlockLayers"] = JSON.stringify(LayersArray);
            }
        }
    }
}



/*************************** files ***************************/
/*
    加载文件，并返回文件内的字符串
    file_mode : "model" 表示加载模型
    file_mode : "block" 表示加载block
*/
function load_file(file_mode){
    // 开始导入文件
    let selectedFile = "";
    let name = "";

    // 指定文件模式
    if(file_mode == "model"){  // 加载 model，只能打开 model 后缀的文件
        selectedFile = document.getElementById("model_files_box").files[0];
        name = selectedFile.name;
        let nameArr = name.split(".");
        
        if(nameArr[nameArr.length - 1] != "model"){
            alert('Please select files end with ".model"');
            return;
        }
    }else if(file_mode == "block"){
        selectedFile = document.getElementById("block_files_box").files[0];
        name = selectedFile.name;
        let nameArr = name.split(".");

        if(nameArr[nameArr.length - 1] != "block"){
            alert('Please select files end with ".block"');
            return;
        }
    }else{
        return;
    }

    if(confirm("Current canvas will be cleaned before importing file, click ok to import file or cancel to quit")){   // 清空当前绘图区
        // 初始化各种变量
        Cur_Layer_Index = 0;
        cur_id_param_box = "";
        cur_canvas_mode_counter = 0;
        
        Cur_Canvas_Name = "";
        Init_Layer_Index = 0;
        Cur_Block_Id = "";
        Class_Code_Counter = 0;
        
        document.getElementById('canvas_title').value = name.split(".")[0];
                
        clearCanvas();
    }else{    // 直接退出
        return;
    }

    // let name = selectedFile.name;        //读取选中文件的文件名
    // let size = selectedFile.size;        //读取选中文件的大小

    let reader = new FileReader();       //这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);     //读取文件的内容

    // //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可
    reader.onload = function(){
        // 用 @ 作为 layers 和 connection 的分割
        let model_str = this.result.split("@");

        // 加载所有层
        load_objs_in_canvas(model_str[0]);
        
        // 重绘所有连接
        restore_connections(model_str[1]);

        // 更新 Class_Code_Counter
        Class_Code_Counter = model_str[2];
    };
}



/*
    load_model
*/
function load_model(){
    load_file("model");
}



/*
    load_model
*/
function load_block(){
    load_file("block");
}



/*************************** block ***************************/
/*
    从文件加载 block
    点击导入按钮，使 files 触发点击事件，然后完成读取文件的操作。
*/
$("#import_block").on("click", function () {
    $("#block_files_box").click();
});



/*
    保存 block 到文件
*/
$("#export_block").on("click", function () {
    if(Cur_Canvas_Name == ""){
        alert("Please input block name!");
        return;
    }

    let saved_objs   = save_objs_in_canvas();   // 保存所有 objs
    let saved_conns  = save_connections();      // 保存所有连接

    // 层与连接之间通过 "@" 进行区分
    let saved_block = saved_objs + "@" + saved_conns + "@" + Class_Code_Counter;

    let blob = new Blob([saved_block], {saved_block: "text/plain;charset=utf-8"});   // 对象

    saveAs(blob, Cur_Canvas_Name + ".block");
});



/*
    保存 block 到侧边栏
*/
$("#save_block").on("click", function () {
    // 1. 检查 block 名是否合法
    if(Cur_Canvas_Name == ""){
        alert("Please input block name!");
        return;
    }

    let Common_Blocks_metaData = JSON.parse(window.localStorage.getItem('Common_Blocks'));
    let Common_Blocks_copy = JSON.parse(JSON.stringify(Common_Blocks_metaData));

    // 首先检查  localStorage 中是否有重名元素
    for(let blockIndex = 0, len = Common_Blocks_copy.length; blockIndex < len; blockIndex++){
        for(let item in Common_Blocks_copy[blockIndex]){
            if(item == Cur_Canvas_Name){
                alert("There is already one block named " + Cur_Canvas_Name + ", please change another name!");
                return;
            }
        }
    }

    // 2. 校验当前 canvas 是否正确
    if(Is_Module_Valid() == false){
        alert("Block is invalid, please check your block again!\nClick the message icon to see details!");
        return;
    }

    // 3. 基本信息
    let NewBlock = {};

    NewBlock[Cur_Canvas_Name] = {};
    NewBlock[Cur_Canvas_Name]["metaName"] = "Common_Blocks_metaData";
    NewBlock[Cur_Canvas_Name]["type"] = "Block";
    NewBlock[Cur_Canvas_Name]["name"] = Cur_Canvas_Name;
    NewBlock[Cur_Canvas_Name]["icon"] = "resources/test.svg";
    NewBlock[Cur_Canvas_Name]["keyWord"] = Cur_Canvas_Name;
    NewBlock[Cur_Canvas_Name]["api"] = "";

    NewBlock[Cur_Canvas_Name]["style"] = "";
    NewBlock[Cur_Canvas_Name]["Layer_ID"] = "";

    NewBlock[Cur_Canvas_Name]["InShape"] = [];
    NewBlock[Cur_Canvas_Name]["outShape"] = [];
    NewBlock[Cur_Canvas_Name]["prev"] = [];
    NewBlock[Cur_Canvas_Name]["next"] = [];

    NewBlock[Cur_Canvas_Name]["ClassDefineStr"] = "";

    NewBlock[Cur_Canvas_Name]["params"] = {};

    NewBlock[Cur_Canvas_Name]["funcs"] = {};
    NewBlock[Cur_Canvas_Name]["funcs"]["Check_Layer_inShape"] = "Blocks_Check_Layer_inShape";
    NewBlock[Cur_Canvas_Name]["funcs"]["Update_Layer_outSape"] = "Blocks_Update_Layer_outSape";

    // 3. canvas 属性
    NewBlock[Cur_Canvas_Name]["BlockDetails"] = {};
    NewBlock[Cur_Canvas_Name]["BlockDetails"]["DimsNumber"] = 0;
    let SavedLayersStr = save_objs_in_canvas();
    let SavedConnsStr  = save_connections();

    let SavedLayers = JSON.parse(SavedLayersStr);
    let dimNum = 0;

    for(let index = 0, len = SavedLayers.length; index < len; index++){
        if(SavedLayers[index].Layer_ID.substring(0,10) == "InputLayer"){
            dimNum = SavedLayers[index]["outShape"].length;
        }
    }

    // 递归清除所有的相关参数
    Clear_Blocks_Code_Str(SavedLayers);

    NewBlock[Cur_Canvas_Name]["BlockDetails"]["DimsNumber"] = dimNum;
    NewBlock[Cur_Canvas_Name]["BlockDetails"]["BlockLayers"] = JSON.stringify(SavedLayers);
    NewBlock[Cur_Canvas_Name]["BlockDetails"]["BlockConnections"] = SavedConnsStr;

    // 4. 添加到 localStorage
    Common_Blocks_metaData.push(NewBlock);
    localStorage.setItem("Common_Blocks", JSON.stringify(Common_Blocks_metaData));

    // 5. 重新创建 block list
    clear_all_list();
    create_all_layers();
    Hide_all_Layers();
});



/*************************** block in model ***************************/
/*
    双击 block 实例，进入 block 内部编辑模式
*/
$("#workspace_canvas").on("dblclick", ".block_in_canvas", function () {
    // 1. 首先要保存当前画布内容
    let PrevCanvas = {};
    PrevCanvas["Init_Layer_Index"] = Init_Layer_Index;         // 保存当前 canvas 的起始 layerCounter
    PrevCanvas["Cur_Canvas_Name"]  = Cur_Canvas_Name;          // 记录当前 canvas 的名
    PrevCanvas["SavedLayers"]      = save_objs_in_canvas();    // 保存层
    PrevCanvas["SavedConns"]       = save_connections();       // 保存连接

    Prev_Canvas_Stack.push(PrevCanvas);
    Prev_Stack_Len++;
    Init_Layer_Index = Cur_Layer_Index;     // 更新，表示下一级 canvas 的起始 layer Counter

    // 2. 获取所双击的 block 对应的快照
    Cur_Block_Id = $(this).attr("id");   // 更新 Cur_Block_Id

    let BlockJson   = JSON.parse($("#" + Cur_Block_Id + " .layer_json_data")[0].innerHTML);
    let SavedLayers = BlockJson["BlockDetails"]["BlockLayers"];
    let savedConns  = BlockJson["BlockDetails"]["BlockConnections"];

    // 双击 block 的时候获取其 api
    Block_Api = BlockJson["api"];

    // 3. 清空画布，并加载 block 快照
    clearCanvas();         // 清空画布

    load_objs_in_canvas(SavedLayers);
    restore_connections(savedConns);   // 加载模型

    // 4. 更新名称显示
    Cur_Canvas_Name += "/" + Cur_Block_Id;   // 更改名称指示器
    document.getElementById('canvas_title').value = Cur_Canvas_Name;

    // 5. 更改工具栏样式
    if(Prev_Stack_Len == 1){  // 表示从第一层开始
        // 变换工具栏
        document.getElementById('model_edit_group').style.display = 'none';
        document.getElementById('block_edit_group').style.display = 'none';
        document.getElementById('edit_block_in_model_group').style.display = 'block';
        document.getElementById('canvas_mode_change').style.display = 'none';
        document.getElementById('clean_canvas').style.display = 'none';
        document.getElementById('Canvas_mode').style.display = 'none';

        // input 设置名称以及只读
        document.getElementById('canvas_title').disabled = true;
    }
});



/*
    取消 block 编辑，这将重新加载上一层的 canvas
*/
$("#cancel_edit_block_in_model").on("click", function () {
    // 1. 获取上一层的 canvas
    let PrevCanvas = Prev_Canvas_Stack.pop();
    Prev_Stack_Len--;

    // 2. 重新加载上一层的 canvas
    clearCanvas();  // 清空画布
    Init_Layer_Index = PrevCanvas["Init_Layer_Index"];   // 恢复为当前层的起始 layerCounter
    Cur_Layer_Index = Init_Layer_Index;                  // 从 init layer Counter 开始

    load_objs_in_canvas(PrevCanvas["SavedLayers"]);
    restore_connections(PrevCanvas["SavedConns"]);    // 重新加载上一级 canvas

    // 退出 block 后，恢复为空
    Block_Api = "";

    // 3. 更新显示名称
    document.getElementById('canvas_title').value = PrevCanvas["Cur_Canvas_Name"];
    Cur_Canvas_Name = document.getElementById('canvas_title').value;

    // 4. 变换工具栏
    if(Prev_Stack_Len == 0){
        document.getElementById('model_edit_group').style.display = 'block';
        document.getElementById('block_edit_group').style.display = 'none';
        document.getElementById('edit_block_in_model_group').style.display = 'none';
        document.getElementById('canvas_mode_change').style.display = 'block';
        document.getElementById('clean_canvas').style.display = 'block';
        document.getElementById('Canvas_mode').style.display = 'block';

        // input 设置名称以及只读
        document.getElementById('canvas_title').disabled = false;
    }
});



/*
    保存编辑结果
*/
$("#save_edit_block_in_model").on("click", function () {
    // 1. 校验当前 canvas 是否正确
    if(Is_Module_Valid() == false){
        alert("block is invalid, please check your block again!\nClick the message icon to see details!");
        return;
    }

    // 2. 保存当前 canvas 的数据
    let savedLayers = save_objs_in_canvas();   // 当前 block 的 SavedLayers
    let savedConns  = save_connections();      // 当前 block 的 SavedConns
    let dimsNum = 0;                           // 当前 block 的 dims

    let InShape = [];     // 当前 block 的 InShape
    let outShape = [];    // 当前 block 的 outShape

    // 更新 InShape 和 outShape
    let layersList = document.getElementsByClassName('layer_in_canvas');
    for(let layerIndex = 0, len = layersList.length; layerIndex < len;  layerIndex++){
        if(layersList[layerIndex].id.substring(0,10) == "InputLayer"){
            InShape = JSON.parse(layersList[layerIndex].getElementsByClassName("layer_json_data")[0].innerHTML).outShape;
            dimsNum = InShape.length;
        }

        if(layersList[layerIndex].id.substring(0,11) == "OutputLayer"){
            outShape = JSON.parse(layersList[layerIndex].getElementsByClassName("layer_json_data")[0].innerHTML).outShape;
        }
    }

    let Cur_Canvas_Name_Array = Cur_Canvas_Name.split("/");
    let oldBlockId = Cur_Canvas_Name_Array[Cur_Canvas_Name_Array.length - 1];   // 该层 block 在上一级的 id

    // 生成 Code
    let api            = "";   // 保存 api
    let ClassDefineStr = "";   // 保存 code
    
    if(Block_Api == ""){   // 如果此前未构造过该 block 的 api，则进行创建；否则沿用之前的 api
        api = oldBlockId.split("_")[0] + "_" + "Class" + Class_Code_Counter;
        Class_Code_Counter++;
    }else{
        api = Block_Api;
    }

    ClassDefineStr = pyTorch_codeGen(api);

    // 3. 获取上一层 canvas 的所有信息
    let PrevCanvas = Prev_Canvas_Stack.pop();
    Prev_Stack_Len--;

    // 4. 重绘上一级 canvas
    clearCanvas();  // 清空画布
    Init_Layer_Index = PrevCanvas["Init_Layer_Index"];   // 恢复为当前层的起始 layerCounter
    Cur_Layer_Index = Init_Layer_Index;                  // 从 init layer Counter 开始

    load_objs_in_canvas(PrevCanvas["SavedLayers"]);
    restore_connections(PrevCanvas["SavedConns"]);    // 重新加载上一级 canvas

    Block_Api = "";

    // 5. 将修改后的 block 数据保存到对应的 block 中
    let newBlockId = oldId2newId[oldBlockId];   // 获取新的 id 映射
    let BlockJson  = JSON.parse($("#" + newBlockId + " .layer_json_data")[0].innerHTML);

    // 数据部分
    BlockJson["InShape"]  = InShape;
    BlockJson["outShape"] = outShape;

    BlockJson["BlockDetails"]["DimsNumber"] = dimsNum;
    BlockJson["BlockDetails"]["BlockLayers"] = savedLayers;
    BlockJson["BlockDetails"]["BlockConnections"] = savedConns;

    //代码部分
    BlockJson["api"]            = api;
    BlockJson["ClassDefineStr"] = ClassDefineStr;

    $("#" + newBlockId + " .layer_json_data")[0].innerHTML = JSON.stringify(BlockJson);

    // 7. 更新显示名称
    document.getElementById('canvas_title').value = PrevCanvas["Cur_Canvas_Name"];
    Cur_Canvas_Name = document.getElementById('canvas_title').value;

    // 8. 变换工具栏
    if(Prev_Stack_Len == 0){
        document.getElementById('model_edit_group').style.display = 'block';
        document.getElementById('block_edit_group').style.display = 'none';
        document.getElementById('edit_block_in_model_group').style.display = 'none';
        document.getElementById('canvas_mode_change').style.display = 'block';
        document.getElementById('clean_canvas').style.display = 'block';
        document.getElementById('Canvas_mode').style.display = 'block';

        // input 设置名称以及只读
        document.getElementById('canvas_title').disabled = false;
    }

    // 9. 重新检测一遍，用于更新样式
    Is_Module_Valid();
});



/*************************** model ***************************/
/*
    从文件加载 model
    点击导入按钮，使 files 触发点击事件，然后完成读取文件的操作。
*/
$("#import_model").click(function(){
    $("#model_files_box").click();
});



/*
    导出模型到文件中
*/
$("#export_model").click(function(){
    if(Cur_Canvas_Name == ""){
        alert("Please input model name!");
        return;
    }

    let saved_objs   = save_objs_in_canvas();   // 保存所有 objs
    let saved_conns  = save_connections();      // 保存所有连接

    // 层与连接之间通过 "@" 进行区分
    let saved_model = saved_objs + "@" + saved_conns + "@" + Class_Code_Counter;

    let blob = new Blob([saved_model], {saved_model: "text/plain;charset=utf-8"});   // 对象

    saveAs(blob, Cur_Canvas_Name + ".model");
});



/*
    保存模型到侧边栏
*/
$("#save_model").click(function(){
    // 1. 检查 block 名是否合法
    if(Cur_Canvas_Name == ""){
        alert("Please input model name!");
        return;
    }

    let Common_Models_metaData = JSON.parse(window.localStorage.getItem('Common_Models'));
    let Common_Models_copy = JSON.parse(JSON.stringify(Common_Models_metaData));

    // 首先检查  localStorage 中是否有重名元素
    for(let modelIndex = 0, len = Common_Models_copy.length; modelIndex < len; modelIndex++){
        for(let item in Common_Models_copy[modelIndex]){
            if(item == Cur_Canvas_Name){
                alert("There is already one model named " + Cur_Canvas_Name + ", please change another name!");
                return;
            }
        }
    }

    // 2. 校验当前 canvas 是否正确
    if(Is_Module_Valid() == false){
        alert("Model is invalid, please check your model again!\nClick the message icon to see details!");
        return;
    }

    // 3. 基本信息
    let NewModel = {};

    NewModel[Cur_Canvas_Name] = {};
    NewModel[Cur_Canvas_Name]["metaName"] = "Common_Models_metaData";
    NewModel[Cur_Canvas_Name]["type"]     = "Model";
    NewModel[Cur_Canvas_Name]["name"]     = Cur_Canvas_Name;
    NewModel[Cur_Canvas_Name]["icon"]     = "resources/test.svg";
    NewModel[Cur_Canvas_Name]["keyWord"]  = Cur_Canvas_Name;

    // 3. canvas 属性
    NewModel[Cur_Canvas_Name]["ModelDetails"] = {};
    NewModel[Cur_Canvas_Name]["ModelDetails"]["ModelLayers"]      = save_objs_in_canvas();
    NewModel[Cur_Canvas_Name]["ModelDetails"]["ModelConnections"] = save_connections();

    // 4. 添加到 localStorage
    Common_Models_metaData.push(NewModel);
    localStorage.setItem("Common_Models", JSON.stringify(Common_Models_metaData));

    // 5. 重新创建 block list
    clear_all_list();
    create_all_layers();
    Hide_all_Layers();    
});



/* 自动生成代码 */
$("#CodeGen").click(function(){
    if(Cur_Canvas_Name == ""){
        alert("Please input model name!");
        return;
    }

    if(Is_Module_Valid() != true){
        alert("Model is invalid, please check your model again!\nClick the message icon to see details!");
        return;
    }

    let CodeString = "import torch\n\n\n";
    CodeString += get_All_Blocks_Code(JSON.parse(save_objs_in_canvas()));

    console.log(CodeString);

    CodeString += pyTorch_codeGen(Cur_Canvas_Name);

    console.log(CodeString);

    let blob = new Blob([CodeString], {CodeString: "text/plain;charset=utf-8"});   // 对象
    saveAs(blob, Cur_Canvas_Name + ".py");
})



/*
    递归获取所有 block 的 Code
*/
function get_All_Blocks_Code(SavedLayers){
    let CodeStr = "";

    // 清空当前所有
    for(let layerIndex = 0, layerLen = SavedLayers.length; layerIndex < layerLen; layerIndex++){
        if(SavedLayers[layerIndex].type == "Block"){
            CodeStr += SavedLayers[layerIndex].ClassDefineStr + "\n\n\n";

            let Layers = SavedLayers[layerIndex].BlockDetails["BlockLayers"];

            if(Layers != ""){
                CodeStr += get_All_Blocks_Code(JSON.parse(Layers)) + "\n\n\n";
            }
        }
    }

    console.log();
    return CodeStr;
}