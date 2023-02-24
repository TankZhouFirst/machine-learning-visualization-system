/*
    整体架构，顶层模块，调用各部分的 api
*/



/*
    禁用右键
*/
document.oncontextmenu = function(){return false;}

/*
    判断浏览器是否支持 localStorage。支持返回 true，否则返回 false。
*/
function Is_LocalStorage_available(){
    return (window.localStorage && (window.localStorage.setItem('ChiXing', "We will change the world!") , window.localStorage.getItem('ChiXing') == "We will change the world!"));
}



/*
    文档（包含 css 和 js）全部加载完成时，执行的操作。
*/
$(document).ready(function(){
    // 1. 检测浏览器是否支持 localStorage
    if(!(Is_LocalStorage_available())){
        while(1){
            alert("Sorry, your browser does not support localStorage, Please change another one!");
        }
    }

    // 2. 初始化模式切换提示部分
    document.getElementById("current_mode_name").innerHTML = "Show all layers";

    // 3. 动态创建所有层列表
    create_all_layers();
    Hide_all_Layers();

    // 4. 创建 Rencent Layers List
    initialize_all_layers_list_weight();
    // 动态创建最近层列表
    Create_Recent_Layers_List();
});



// 一些 element 的句柄
var mode_switch_button = document.getElementById("mode_change_button");        // 模式切换按钮
var mode_switch_button_bg = document.getElementById("layers_mode_change");     // 模式切换按钮的背景
var right_main_region = document.getElementById("right_main_region");          // 右侧主工作区



/*
    模式切换
    1. 按钮外观的变化
    2. 显示所有层
*/
mode_switch_button.onclick = function(){
    // 首先判断按钮的偏移，以此判断当前模式
    if(mode_switch_button.offsetLeft == 0){  // 当前按钮为普通状态，点击后需要切换
        mode_switch_button.style['left'] = 40 + "px";    // 将 mode_change_button 的 left 属性设置为 40px
        mode_switch_button_bg.style['background-color'] = "#BEBEBE"; // 设置按钮背景框颜色
        document.getElementById("current_mode_name").innerHTML = "Hide all layers";    // 修改描述

        // 显示所有层列表
        Show_all_Layers();
    }
    else{    // 当前按钮为完全状态，点击后需要切换（收缩回去）
        // 由于这里并未修改 html，所以读取的仍为原始的值，只是暂时的进行了修改。所以，这里 + 0 表示原始值
        mode_switch_button.style['left'] = 0 + "px";     // 将 mode_change_button 的 left 属性 0px（不变）
        mode_switch_button_bg.style['background-color'] = "white";   // 设置按钮背景框颜色
        document.getElementById("current_mode_name").innerHTML = "Show all layers";      // 修改描述

        // 显示所有层列表
        Hide_all_Layers();
    }
}



/*
    全屏功能，将 top_container 部分全屏显示
*/
$("#view_btn_group").on("click", "#button_full_screen", function(){
    let i = document.getElementById("top_container");

    // 针对各个浏览器进行兼容
    if (i.requestFullscreen) {
        i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
        i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen();
    }
});



/*
    search_box_content input 获取 focus 后执行的操作
*/
$("#search_box_content").focus(function(){
    // 清空搜索结果
    $('#Search_Result_list').empty();

    // 显示搜索结果（搜索结果展示 div）
    document.getElementById('left_layer_menu_region_div').style.display = 'none';
    document.getElementById('search_result_div').style.display = 'block';
});



/*
    点击搜索后执行的操作
*/
$(".search_box").on("click", "#Search_button", function(){
    // 显示搜索结果（搜索结果展示 div）
    document.getElementById('left_layer_menu_region_div').style.display = 'none';
    document.getElementById('search_result_div').style.display = 'block';

    // 创建搜索结果
    search_result_create();
});



/*
    在 search_box_content 上按下回车键时执行的操作
*/
$('#search_box_content').bind('keydown',function(event){
    if(event.keyCode == "13"){
        document.getElementById('left_layer_menu_region_div').style.display = 'none';
        document.getElementById('search_result_div').style.display = 'block';

        // 由于回车是建立在 input 已经 focused 的基础上，所以这里只需要直接显示搜索结果即可
        search_result_create();
    }
});



/*
    清除搜索结果
    点击搜索后执行的操作
*/
$(".search_box").on("click", "#Clear_button", function(){
    // 清除搜索框
    document.getElementById('search_box_content').value = "";
    document.getElementById('search_box_content').setAttribute("placeholder"," Search object");

    // 清空搜索结果
    $('#Search_Result_list').empty();

    document.getElementById('left_layer_menu_region_div').style.display = 'block';
    document.getElementById('search_result_div').style.display = 'none';
});



/*
    显示参数窗口
*/
function showPopBox(){
    document.getElementById('popBox').style.display = 'block';             // 显示参数填写窗口
    document.getElementById('popBox_mask').style.display = 'block';        // 显示背景掩膜
}



/*
    隐藏参数窗口
*/
function hidePopBox(){
    // 隐藏窗口
    document.getElementById('popBox').style.display = 'none';        // 隐藏参数填写窗口
    document.getElementById('popBox_mask').style.display = 'none';   // 隐藏参数填写窗口
}



/*
    清空参数窗口
*/
function clear_param_form(){
    // 清空所有子元素
    $('#parameters_form').empty();
    $('#extra_input_form').empty();
}



/*
    弹窗按下 cancel 时执行的操作
    什么都不做
*/
function PopBox_Cancel(){
    hidePopBox();
}



/*
    弹窗按下 OK 时执行的操作
    1. 检查填入的类型是否符合要求（若符合要求则执行后续步骤，否则直接退出）
    2. 更新参数
    3. 关闭表单
    4. 检查模型是否合法
*/
function PopBox_OK(){
    // 检测填入参数的类型
    let typeCheck_str = Is_filled_params_valid();
    if(typeCheck_str != ""){
        alert(typeCheck_str);
        // 这个 return 一定不能少
        return;
    }

    // 更新参数
    update_params(cur_id_param_box);

    // 执行到最后需要隐藏 PopBox
    hidePopBox();

    // 检查模型是否合法
    Is_Module_Valid();
}



/*
    切换当前绘图区的模式
*/
var cur_canvas_mode_counter = 0;  // 用于统计当前点击了多少次
$("#canvas_mode_change").on("click", function(){
    // 点击一次
    cur_canvas_mode_counter++;

    if(cur_canvas_mode_counter % 2 == 0){
        // 切换编辑按钮组
        document.getElementById('model_edit_group').style.display = 'block';
        document.getElementById('block_edit_group').style.display = 'none';

        // 更新提示信息
        document.getElementById('Canvas_mode').innerHTML = "Model Name : ";
    }else{
        // 切换编辑按钮组
        document.getElementById('model_edit_group').style.display = 'none';
        document.getElementById('block_edit_group').style.display = 'block';

        // 更新提示信息
        document.getElementById('Canvas_mode').innerHTML = "Block Name : ";
    }
});



/*
    清空画布
*/
$("#clean_canvas").click(function(){
    // 提示保存当前正在绘制的模型
    if(confirm("Empty current canvas?")){
        // 初始化各种变量
        Prev_Canvas_Stack = [];
        Prev_Stack_Len = 0;
        Cur_Canvas_Name = ""
        Init_Layer_Index = 0;
        Cur_Block_Id = "";
        Class_Code_Counter = 0;
        Block_Api = "";

        Cur_Layer_Index = 0;
        cur_id_param_box = "";
        cur_canvas_mode_counter = 0;

        document.getElementById('canvas_title').value = "";
        
        clearCanvas();
    }
});



/*
    清空当前画布
*/
function clearCanvas(){
    // 第一步，要删除所有连接，因为直接用 empty 只会删除图层，但是连接不会被删除
    let all_Conns_array = jsPlumb_Instance.getConnections();

    for(let connIndex = 0, connLen = all_Conns_array.length; connIndex < connLen; connIndex++){
        jsPlumb_Instance.deleteConnection(all_Conns_array[connIndex]);
    }

    let layers_list = document.getElementsByClassName('layer_in_canvas');
    let layersLen =  layers_list.length;
    let blocks_list = document.getElementsByClassName('block_in_canvas');
    let blocksLen =  blocks_list.length;

    // 清空 layers
    for(let layerIndex = layersLen - 1; layerIndex >= 0; layerIndex--){
        jsPlumb_Instance.remove(layers_list[layerIndex].id);
    }

    // 清空 blocks
    for(let blockIndex = blocksLen - 1; blockIndex >= 0; blockIndex--){
        jsPlumb_Instance.remove(blocks_list[blockIndex].id);
    }
}