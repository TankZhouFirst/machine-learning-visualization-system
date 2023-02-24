/* 
    侧边栏层列表动态创建相关 
*/



/*
    根据传入的 metaData，创建对应的列表
    ** 所有 layers 和 blocks 和 Models 都参与列表的创建 **
*/
function metaData_layer_list_create(metaData){
    let header_id    = metaData[0]["dom_div_name"] + "_header";     // 获取对应的 header id 名
    let list_id      = metaData[0]["dom_div_name"] + "_list";       // 获取对应的 list id 名
    let header_text  = metaData[0]["dom_header_text"];              // 获取对应的 header 显示文字

    // 创建 header 对应的 html
    let header_dom = '<div class="layer_class_header" data-toggle="collapse" id="' + header_id + '" data-target="#' + list_id + '" >' +
                        '<span class="layer_class_name">' + header_text + "</span>" + 
                     "</div>";
    
    // 创建 list 对应的 html
    let list_dom = '<div class="layer_class_list collapse" id="' + list_id + '" aria-labelledby="' + header_id + '"></div>'

    // 添加 header 和 list 到 html dom 中
    $("#left_layer_menu_region_div").append(header_dom);
    $("#left_layer_menu_region_div").append(list_dom);

    // 创建 layers 列表
    for(let layer_index = 1, len = metaData.length; layer_index < len; layer_index++){  // 遍历所有层
        for(let layer_name in metaData[layer_index]){   // layer 对应的 json 的 key
            let className = "";

            // 其他部分需要添加删除功能
            if(metaData[layer_index][layer_name].type == "Layer"){
                className = "single_layer_div";
            }else{
                className = "block_or_model";
            }

            // 下面这一段中的 id 极其重要，在程序其他部分用到，不要随便变更
            let layer_dom = 
                '<div class="' + className + '" id="' + layer_name + '">' + 
                    '<span class="layer_svg"> <img src="' + metaData[layer_index][layer_name].icon + '" width="40px" height="40px"/></span>' + 
                    '<span class="layer_name">' + layer_name + '</span>' + 
                    // 这里有一个小的 trick，在每一层创建的时候，会将其所属的 metaData 名添加到隐藏的 span 中，便于后续查找
                    '<span class="layerMetaClass" style="display:none">' + metaData[layer_index][layer_name].metaName + '</span>' + 
                    // 另一个 trick，直接保存该层在 metaData 中的索引
                    // 由于是动态创建，所以总是正确的
                    '<span class="layerIndex" style="display:none">' + layer_index + '</span>' +
                    // 层的类型，是 Layer 还是 Block 还是 Module
                    '<span class="layerClass" style="display:none">' + metaData[layer_index][layer_name].type + '</span>' +
                "</div>";


            
            $("#" + list_id).append(layer_dom);
        }
    }

    // 拖拽 layer 时的属性设置
    // 设置 list_id 的 div 选项可拖拽，并且以 clone 的形式
    // 可拖拽的范围为 plant_canvas， 这是一个标志，需要对应的容器有一样的标志
	$("#" + list_id + " div").draggable({
		helper: "clone",
		scope: "plant_canvas"
    });

    // 放置 layer 时的属性设置，workspace_canvas 为可放置的区
    // 这里有个坑，mark 一下：drop 是在最后拖拽的时候才会执行。所以不能传递包含于被拖拽对象之外的变量，否则变量的值可能不对（保持最后一次更新的值）
    $("#workspace_canvas").droppable({
		scope: "plant_canvas",
		// 放置时调用的操作
		drop: function(event, ui){
            // 拖拽放置后，需要创建对应的模型
            Create_Obj_in_canvas(ui, $(this));
		}
	});
}



/* 
    遍历 metaData 列表，初始化所有的层 
    ** 所有 layers 和 blocks 和 Models 都参与列表的创建 **
*/
function create_all_layers(){
    /*************** 1. 初始化相关的 metaData 到 localStorage ***************/
    // 如果第一次加载，则保存到本地
    if(window.localStorage.getItem('Common_Blocks') == null){
        localStorage.setItem("Common_Blocks", JSON.stringify(initial_Common_Blocks_metaData));
    }

    if(window.localStorage.getItem('Common_Models') == null){
        localStorage.setItem("Common_Models", JSON.stringify(initial_Common_Models_metaData));
    }   

    /*************** 2. 动态创建列表 ***************/
    // 创建 blocks 列表
    let Common_Blocks_metaData = JSON.parse(window.localStorage.getItem('Common_Blocks'));
    metaData_layer_list_create(Common_Blocks_metaData);

    // 创建 Models 列表
    let Common_Models_metaData = JSON.parse(window.localStorage.getItem('Common_Models'));
    metaData_layer_list_create(Common_Models_metaData);

    // 后创建所有层（默认不显示）
    for(let metaData_index = 0, len = Layers_metaData_Collection.length; metaData_index < len; metaData_index++){
        let metaData_copy = JSON.parse(JSON.stringify(window[Layers_metaData_Collection[metaData_index]]));
        metaData_layer_list_create(metaData_copy);
    }
}



/*
    删除所有的 list，recent 除外
*/
function clear_all_list(){
    let header_id    = "";     // 获取对应的 header id 名
    let list_id      = "";     // 获取对应的 list id 名

    // models
    let Common_Models_metaData = JSON.parse(window.localStorage.getItem('Common_Models'));
    header_id  = Common_Models_metaData[0]["dom_div_name"] + "_header";
    list_id    = Common_Models_metaData[0]["dom_div_name"] + "_list";
    $("#" + header_id).remove();
    $("#" + list_id).remove();

    // models
    let Common_Blocks_metaData = JSON.parse(window.localStorage.getItem('Common_Blocks'));
    header_id  = Common_Blocks_metaData[0]["dom_div_name"] + "_header";
    list_id    = Common_Blocks_metaData[0]["dom_div_name"] + "_list";
    $("#" + header_id).remove();
    $("#" + list_id).remove();

    // layers
    for(let metaData_index = 0, len = Layers_metaData_Collection.length; metaData_index < len; metaData_index++){
        header_id  = window[Layers_metaData_Collection[metaData_index]][0]["dom_div_name"] + "_header";
        list_id    = window[Layers_metaData_Collection[metaData_index]][0]["dom_div_name"] + "_list";
        $("#" + header_id).remove();
        $("#" + list_id).remove();
    }
}



/*
    一般模式，隐藏所有层列表
    ** 不包含 blocks 和 Models，因为它们始终显示 **
*/
function Hide_all_Layers(){
    // 遍历所有层
    for(let metaData_index = 0, len = Layers_metaData_Collection.length; metaData_index < len; metaData_index++){
        // 获取 metaData 对应的字符串
        let metaData_str = Layers_metaData_Collection[metaData_index];
        // 获取对应的 id
        let header_id = window[metaData_str][0]["dom_div_name"] + "_header";
        let list_id = window[metaData_str][0]["dom_div_name"] + "_list";

        // 隐藏列表
        document.getElementById(header_id).style.display = 'none';
        document.getElementById(list_id).style.display = 'none';
    }
}


/*
    高级模式，显示所有层列表
    ** 不包含 blocks 和 Models，因为它们始终显示 **
*/
function Show_all_Layers(){
    // 遍历所有层
    for(let metaData_index = 0, len = Layers_metaData_Collection.length; metaData_index < len; metaData_index++){
        // 获取 metaData 对应的字符串
        let metaData_str = Layers_metaData_Collection[metaData_index];
        // 获取对应的 id
        let header_id = window[metaData_str][0]["dom_div_name"] + "_header";
        let list_id = window[metaData_str][0]["dom_div_name"] + "_list";

        // 隐藏列表
        document.getElementById(header_id).style.display = '';
        document.getElementById(list_id).style.display = '';
    }
}



/*
    该函数用于初始化所有层的权值，初始化为 0 
    随后，将包含相应数据的 json 通过 localStorage 进行存储，以便后续处理
    在这里，按照层的级数进行存储，便于后续处理。先是每个类别，然后是对应的每个层
    ** 不包含 blocks 和 Models，因为 recent layers 只包含 layers **
*/
function initialize_all_layers_list_weight(){
    if((localStorage.getItem("all_layers_weights") != null) && (localStorage.getItem("recent_layers_weights") != null)){
        return;
    }

    // 1. 首先定义一个用于存储所有层权值的 json。
    //      每个元素的 key 为对应的 metaData 名，其值又为一个 json
    //      子 json 中，每个元素的 key 为层名，值为其权值
    let all_layers_list_weight_json = {};

    // 2. 开始迭代每个 metaData
    for(let metaIndex = 0, len = Layers_metaData_Collection.length; metaIndex < len; metaIndex++){
        // 获取该 metaData 的字符串
        let metaData_str = Layers_metaData_Collection[metaIndex];

        // 创建该 metaData 对应的 json （空）
        all_layers_list_weight_json[metaData_str] = {};

        // 迭代 metaData 内的所有层
        for(let layerIndex = 1, layerLen = window[metaData_str].length; layerIndex < layerLen; layerIndex++){
            for(let layer_str in window[metaData_str][layerIndex]){
                all_layers_list_weight_json[metaData_str][layer_str] = 0;
            }
        }
    }
    // 使用 localStorage 进行存储
    localStorage.setItem("all_layers_weights", JSON.stringify(all_layers_list_weight_json));
    localStorage.setItem("recent_layers_weights", JSON.stringify(initial_recent_layers_weight_array));       
}



/* 
    更新所有层的权值参数，在每一次往画布中拖拽新的层的时候进行该操作
    该操作将会所有的权值缩小到原来的 0.9，以更快的适应当前的操作习惯 
    ** 不包含 blocks 和 Models，因为 recent layers 只包含 layers **
*/
function pre_scale_all_layers_weight(){
    // 读取历史权值数据
    let all_layers_list_weight_json = JSON.parse(localStorage.getItem("all_layers_weights"));
    let recent_layers_weight_array = JSON.parse(localStorage.getItem("recent_layers_weights"));

    // 预处理所有层的权值数据
    for(let metaData_str in all_layers_list_weight_json){
        for(let layer_str in all_layers_list_weight_json[metaData_str]){   // 遍历所有层
            // 衰减原始权值
            all_layers_list_weight_json[metaData_str][layer_str] *= 0.9;
        }
    }

    // 预处理 recent layers 权值
    for(let index = 0, len = recent_layers_weight_array.length; index < len; index++){  // 迭代每个元素
        for(let layer_str in recent_layers_weight_array[index]){  // 获取层名
            recent_layers_weight_array[index][layer_str] *= 0.9;
        }
    }

    // 写回权值
    localStorage.setItem("all_layers_weights", JSON.stringify(all_layers_list_weight_json));
    localStorage.setItem("recent_layers_weights", JSON.stringify(recent_layers_weight_array));
}



/*
    根据传入的 layer name 更新所有层权值参数，并调整 recent layers 列表
    layerName 即所拖拽的层对应的 id
    ** 不包含 blocks 和 Models，因为 recent layers 只包含 layers **
*/
function Update_Recent_Layers_List(layerName){
    // 1. 将所有层的权值进行缩减
    pre_scale_all_layers_weight();

    // 2. 读取当前所有权值数据
    let recent_layers_weight_array = JSON.parse(localStorage.getItem("recent_layers_weights"));
    let all_layers_list_weight_json = JSON.parse(localStorage.getItem("all_layers_weights"));

    // 3. 首先查找 recent layers 中的最小值对应的索引，与此同时，查找当前被拖拽的层是否存在于 recent layers 中
    let lowest_index = -1;          // 最小值对应索引
    let lowest_value = Infinity;    // 最小值
    let Is_In_Recent = false;       // 当前拖拽的层是否存在于 recent layers

    for(let recent_layer_index = 0, len = recent_layers_weight_array.length; recent_layer_index < len; recent_layer_index++){
        for(let recent_layer_str in recent_layers_weight_array[recent_layer_index]){
            // 更新最小值信息
            if(recent_layers_weight_array[recent_layer_index][recent_layer_str] < lowest_value){
                lowest_index = recent_layer_index;   // 更新最小值对应索引
                lowest_value = recent_layers_weight_array[recent_layer_index][recent_layer_str];  // 更新最小值
            }

            // 判定当前拖拽的层是否存在于 recent layers 中
            // 若存在，则置位标志位，并更新 recent layers 中的权值参数
            if(layerName == recent_layer_str){
                Is_In_Recent = true;
                recent_layers_weight_array[recent_layer_index][recent_layer_str] += 1;  
            }
        }
    }

    // 4. 根据当前层的名字，查找对应的权值，并进行更新
    for(let metaData_str in all_layers_list_weight_json){
        for(let all_layer_str in all_layers_list_weight_json[metaData_str]){
            if(layerName == all_layer_str){
                // 更新所有层列表中该层对应的权值信息
                all_layers_list_weight_json[metaData_str][all_layer_str] += 1;  

                // 如果 recent layers 中不存在该层，则用该层替换权值最低的层
                if(Is_In_Recent != true){
                    recent_layers_weight_array[lowest_index] = {};
                    recent_layers_weight_array[lowest_index][all_layer_str] = all_layers_list_weight_json[metaData_str][all_layer_str];
                }
            }
        }
    }

    // 5. 将更新后的值写回 local Storage
    localStorage.setItem("all_layers_weights", JSON.stringify(all_layers_list_weight_json));
    localStorage.setItem("recent_layers_weights", JSON.stringify(recent_layers_weight_array));

    // 6. 更新 recent layers 侧边栏
    Create_Recent_Layers_List();
}



/*
    动态创建 recent layers 侧边栏
    ** 不包含 blocks 和 Models，因为 recent layers 只包含 layers **
*/
function Create_Recent_Layers_List(){
    // 首先清空列表
    $("#Recent_layers_list").empty();

    // 读取当前 recent layers 列表
    let recent_layers_weight_array = JSON.parse(localStorage.getItem("recent_layers_weights"));

    // 获取 recent layers 列表中的每个 layer，并进行处理
    for(let recent_layer_index = 0, recent_layer_len = recent_layers_weight_array.length; recent_layer_index < recent_layer_len; recent_layer_index++){
        for(let recent_layer_str in recent_layers_weight_array[recent_layer_index]){

            // 上面的 recent_layer_str 实际上就是列表的层的名字
            let metaData_str = $("#" + recent_layer_str + " .layerMetaClass")[0].innerHTML;
            let layer_index = $("#" + recent_layer_str + " .layerIndex")[0].innerHTML;
            let layer_Type = $("#" + recent_layer_str + " .layerClass")[0].innerHTML;

            // 动态创建 list div
            // var layer_item_str = '<div id="' + obj + '">' + obj + '</div>';
            let layer_item_str = 
            '<div class="single_layer_div" id="' + recent_layer_str + '">' + 
                '<span class="layer_svg"> <img src="' + window[metaData_str][layer_index][recent_layer_str].icon + '" width="40px" height="40px"/> </span>' + 
                '<span class="layer_name">' + recent_layer_str + '</span>' + 
                // 这里有一个小的 trick，在每一层创建的时候，会将其所属的 metaData 名添加到隐藏的 span 中，便于后续查找
                '<span class="layerMetaClass" style="display:none">' + metaData_str + '</span>' + 
                // 另一个 trick，直接保存该层在 metaData 中的索引
                // 由于是动态创建，所以总是正确的
                '<span class="layerIndex" style="display:none">' + layer_index + '</span>' +
                // 层的类型，是 Layer 还是 BLock 还是 Module
                '<span class="layerClass" style="display:none">' + layer_Type + '</span>' +
            "</div>";
            
            // 动态添加到对应 list 列表下
            $("#Recent_layers_list").append(layer_item_str); 
        }
    }

    // 设置 recent layers 列表中各层的可拖拽性
    // 设置 layer_class_list_id 的 div 选项可拖拽，并且以 clone 的形式
    // 可拖拽的范围为 plant_canvas， 这是一个标志，需要对应的容器有一样的标志
    $("#Recent_layers_list" + " div").draggable({
        helper: "clone",
        scope: "plant_canvas"
    });
    
    // 放置 layer 时的属性设置，workspace_canvas 为可放置的区
    $("#workspace_canvas").droppable({
        scope: "plant_canvas",
        // 放置时调用的操作
        drop: function(event, ui){
            // 拖拽放置后，需要创建对应的模型
            Create_Obj_in_canvas(ui, $(this));
        }
    });
};



/*
    在单个 metaData 中搜索
    这里应该包含所定义的 blocks 和 Models
*/
function search_single_metaData(metaData, sub_str){
    // 若搜索到了，则返回 true；否则返回 false
    let Is_In = false;

    // 遍历指定 metaData 的所有元素，进行匹配
    for(let obj_index = 1, obj_len = metaData.length; obj_index < obj_len; obj_index++){
        for(let obj_str in metaData[obj_index]){
            if(metaData[obj_index][obj_str].keyWord.toLowerCase().search(sub_str.toLowerCase()) != -1){  // 匹配成功

                Is_In = true;  // 搜索到了
                
                let ClassName = "";
                
                if(metaData[obj_index][obj_str].type == "Layer"){
                    ClassName = "single_layer_div";
                }else{
                    ClassName = "block_or_model";
                }

                // 动态创建 list div
                // var obj_item_str = '<div id="' + obj + '">' + obj + '</div>';
                let obj_item_str = 
                    '<div class="' + ClassName + '" id="' + obj_str + '">' + 
                        '<span class="layer_svg"> <img src="' + metaData[obj_index][obj_str].icon + '" width="40px" height="40px"/> </span>' + 
                        '<span class="layer_name">' + obj_str + '</span>' + 
                        // 这里有一个小的 trick，在每一层创建的时候，会将其所属的 metaData 名添加到隐藏的 span 中，便于后续查找
                        '<span class="layerMetaClass" style="display:none">' + metaData[obj_index][obj_str].metaName + '</span>' + 
                        // 另一个 trick，直接保存该层在 metaData 中的索引
                        // 由于是动态创建，所以总是正确的
                        '<span class="layerIndex" style="display:none">' + obj_index + '</span>' +
                        // 层的类型，是 Layer 还是 BLock 还是 Module
                        '<span class="layerClass" style="display:none">' + metaData[obj_index][obj_str].type + '</span>' +
                    "</div>";
                // 动态添加到对应 list 列表下
                $("#Search_Result_list").append(obj_item_str);
            }
        }
    }

    return Is_In;
}



/*
    创建搜索结果列表
*/
function search_result_create(){
    // 先清空搜索结果
    $("#Search_Result_list").empty();

    // 获取当前搜索框内的字符串
    let search_str = document.getElementById('search_box_content').value.trim();

    // 如果为空字符串，则直接退出
    if(search_str == ""){
        alert("Empty keyword.");
        return;
    }

    // 是否查找到匹配项
    let Is_result_empty = false;

    // 搜索各个 metaData，寻找匹配项（layer 部分）
    for(let metaData_index = 0, metaData_len = Layers_metaData_Collection.length; metaData_index < metaData_len; metaData_index++){
        if(search_single_metaData(window[Layers_metaData_Collection[metaData_index]], search_str)){
            Is_result_empty = true;
        }
    }

    // 搜索 blocks 部分
    let Common_Blocks_metaData = JSON.parse(window.localStorage.getItem('Common_Blocks'))
    if(search_single_metaData(Common_Blocks_metaData, search_str)){
        Is_result_empty = true;
    }

    // 搜索 Models 部分
    let Common_Models_metaData = JSON.parse(window.localStorage.getItem('Common_Models'));
    if(search_single_metaData(Common_Models_metaData, search_str)){
        Is_result_empty = true;
    }

    // 如果未找到，进行提示
    if(! Is_result_empty){
        alert("No matches found!\n" + "Maybe you shold input shorter keyword!");
    }

    // 拖拽 layer 时的属性设置
    // 设置 layer_class_list_id 的 div 选项可拖拽，并且以 clone 的形式
    // 可拖拽的范围为 plant_canvas， 这是一个标志，需要对应的容器有一样的标志
	$("#Search_Result_list div").draggable({
		helper: "clone",
		scope: "plant_canvas"
    });

    // 放置 layer 时的属性设置，workspace_canvas 为可放置的区
    $("#workspace_canvas").droppable({
		scope: "plant_canvas",
		// 放置时调用的操作
		drop: function(event, ui){
            // 拖拽放置后，需要创建对应的模型
			Create_Obj_in_canvas(ui, $(this));
		}
    });
}