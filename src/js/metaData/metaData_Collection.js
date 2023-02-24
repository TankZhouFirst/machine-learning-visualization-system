/* 包含所有的 metaData */

/*
    所有层对应的 metaData，默认隐藏
*/
var Layers_metaData_Collection = [
    "Activation_layers_metaData",
    "Convolution_layers_metaData",
    // "DataParallel_layers_metaData",  // type check 未做，待完善
    "Distance_functions_metaData",
    "Dropout_layers_metaData",
    "Linear_layers_metaData",
    "Normalization_layers_metaData",
    "Other_layers_metaData",
    "Padding_layers_metaData",
    "Pooling_layers_metaData"
    // "Sparse_layers_metaData",   // type check 未做，待完善
    // "Vision_layers_metaData"    // type check 未做，待完善
];


/*
    最近使用层初始化列表（12个）
    其中每一项包含层的名字（key）以及对应的权值（value）
    权值初始化为 0，后续根据用户使用习惯进行动态调节
    这里必须为 array，因为在其他地方中用到其特性
*/
var initial_recent_layers_weight_array = [
    { "InputLayer"  :  0 },
    { "OutputLayer" :  0 },
    { "Conv2d"      :  0 },
    { "MaxPool2d"   :  0 },
    { "AvgPool2d"   :  0 },
    { "BatchNorm2d" :  0 },
    { "Sigmoid"     :  0 },
    { "ReLU"        :  0 },
    { "FlattenLayer":  0 },
    { "Linear"      :  0 },
    { "Dropout"     :  0 },
    { "Dropout2d"   :  0 },    
    { "Softmax"     :  0 }
];