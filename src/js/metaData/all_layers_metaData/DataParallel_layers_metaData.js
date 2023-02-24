// /*
//     数据并行部分
// */

// var DataParallel_layers_metaData = [
//     {
//         // 第一个元素包含该 metaData 的基本信息
//         "metaDataName"      : "DataParallel_layers_metaData",   // metaData 的名字
//         "metaDataType"      : "Layers_metaData",                // metaData 的类型
//         "dom_div_name"      : "DataParallel_layers",            // 该字段用于生成列表中的 header 和 list 名
//         "dom_header_text"   : "DataParallel Layers"             // header 上显示的描述名
//     },
//     {
//         /*
//             ** 层功能 **：
//                 在 module 层进行数据并行。

//                 该容器并行处理指定的 module，通过将输入在 batch 维度上进行分拆到不同设备上进行的。
//                 在前向传播阶段，在各个设备上重复该模块，并且每个副本处理输入的一部分。
//                 再反向传播阶段，将各个设备上的梯度进行求和，并送入原始设备。

//                 batch 尺寸应该比 GPU 数目更大。详细可见：https://pytorch.org/docs/stable/notes/cuda.html#cuda-nn-dataparallel-instead

//                 Arbitrary positional and keyword inputs are allowed to be passed into DataParallel EXCEPT Tensors. 
//                 All tensors will be scattered on dim specified (default 0). 
//                 Primitive types will be broadcasted, but all other types will be a shallow copy and 
//                 can be corrupted if written to in the model’s forward pass.

//                 Forward and backward hooks defined on module and its submodules will be invoked len(device_ids) times, 
//                 each with inputs located on a particular device. Particularly, the hooks are only guaranteed to be executed in 
//                 correct order with respect to operations on corresponding devices. For example, 
//                 it is not guaranteed that hooks set via register_forward_pre_hook() be executed before 
//                 all len(device_ids) forward() calls, but that each such hook be executed before the corresponding forward() call of that device.

//                 When module returns a scalar (i.e., 0-dimensional tensor) in forward(), this wrapper will return a vector of length 
//                 equal to number of devices used in data parallelism, containing the result from each device.
                
//             ** 层说明 **：

            
//             ** 层构造参数 **：
//                 module        ： module to be parallelized
//                 device_ids    ： CUDA devices (default: all devices)
//                 output_device ： device location of output (default: device_ids[0])

//             ** 层输入 **：


//             ** 层输出 **：


//             ** 模型学习参数 **：
//                 module (Module) ： the module to be parallelized

            
//             ** 示例 **：
//                 net = torch.nn.DataParallel(model, device_ids=[0, 1, 2])
//                 output = net(input_var)

//         */
//         "DataParallel":{
//             "metaName":"DataParallel_layers_metaData",    // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"DataParallel",                        // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "DataParallel",                   // 搜索时对应的关键字
//             "api":"torch.nn.DataParallel",                // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "module"       : {"type" : "", "value" : ""},
//                 "device_ids"   : {"type" : "", "value" : "None"},
//                 "output_device": {"type" : "", "value" : "None"},
//                 "dim"          : {"type" : "", "value" : "0"},
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "DataParallel_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "DataParallel_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
//     {
//         /*
//             ** 层功能 **：
//                 详见： https://pytorch.org/docs/stable/nn.html#distributeddataparallel

//                 Implements distributed data parallelism at the module level.

//                 This container parallelizes the application of the given module by splitting the input across the specified devices by 
//                 chunking in the batch dimension. The module is replicated on each machine and each device, 
//                 and each such replica handles a portion of the input. During the backwards pass, gradients from each node are averaged.

//                 The batch size should be larger than the number of GPUs used locally. 
//                 It should also be an integer multiple of the number of GPUs so that each chunk 
//                 is the same size (so that each GPU processes the same number of samples).

//                 The same constraints on input as in torch.nn.DataParallel apply.

//                 Creation of this class requires the distributed package to be already initialized in the process group mode 
//                 (see torch.distributed.init_process_group()).

//                 This module works only with the nccl and gloo backends.

//                 Constructor, forward method, and differentiation of the output (or a function of the output of this module) 
//                 is a distributed synchronization point. Take that into account in 
//                 case different processes might be executing different code.

//                 This module assumes all parameters are registered in the model by the time it is created. 
//                 No parameters should be added nor removed later. Same applies to buffers.

//                 This module assumes all buffers and gradients are dense.

//                 This module doesn’t work with torch.autograd.grad() (i.e. it will only work if gradients are to be accumulated in 
//                 .grad attributes of parameters).

//                 If you plan on using this module with a nccl backend or a gloo backend (that uses Infiniband), 
//                 together with a DataLoader that uses multiple workers, please change the multiprocessing start 
//                 method to forkserver (Python 3 only) or spawn. Unfortunately Gloo (that uses Infiniband) and NCCL2 
//                 are not fork safe, and you will likely experience deadlocks if you don’t change this setting.

//                 Parameters are never broadcast between processes. The module performs an all-reduce step on gradients 
//                 and assumes that they will be modified by the optimizer in all processes in the same way. 
//                 Buffers (e.g. BatchNorm stats) are broadcast from the module in process of rank 0, to all 
//                 other replicas in the system in every iteration.

//                 Forward and backward hooks defined on module and its submodules won’t be invoked anymore, 
//                 unless the hooks are initialized in the forward() method.
                
//             ** 层说明 **：

            
//             ** 层构造参数 **：
//                 module            ： module to be parallelized
//                 device_ids        ： CUDA devices (default: all devices)
//                 output_device     ： device location of output (default: device_ids[0])
//                 broadcast_buffers ： flag that enables syncing (broadcasting) buffers of the module at beginning of the forward function. (default: True)

//             ** 层输入 **：


//             ** 层输出 **：


//             ** 模型学习参数 **：
//                 module (Module) ： the module to be parallelized

            
//             ** 示例 **：
//                 torch.distributed.init_process_group(world_size=4, init_method='...')
//                 net = torch.nn.DistributedDataParallel(model)

//         */
//         "DistributedDataParallel":{
//             "metaName":"DataParallel_layers_metaData",    // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"DistributedDataParallel",             // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "DistributedDataParallel",        // 搜索时对应的关键字
//             "api":"torch.nn.DistributedDataParallel",     // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "module"             : {"type" : "",   "value" : ""},
//                 "device_ids"         : {"type" : "",   "value" : "None"},
//                 "output_device"      : {"type" : "",   "value" : "None"},
//                 "dim"                : {"type" : "",   "value" : "0"},
//                 "broadcast_buffers"  : {"type" : "",   "value" : "True"},
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "DistributedDataParallel_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "DistributedDataParallel_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
// ];