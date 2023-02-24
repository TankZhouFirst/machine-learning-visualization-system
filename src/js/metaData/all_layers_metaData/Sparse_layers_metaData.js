// /* 解析词嵌入 */

// var Sparse_layers_metaData = [
//     {
//         // 第一个元素包含该 metaData 的基本信息
//         "metaDataName"      : "Sparse_layers_metaData",   // metaData 的名字
//         "metaDataType"      : "Layers_metaData",          // metaData 的类型
//         "dom_div_name"      : "Sparse_layers",            // 该字段用于生成列表中的 header 和 list 名
//         "dom_header_text"   : "Sparse Layers"             // header 上显示的描述名
//     },
//     {
//         /*
//             ** 层功能 **：
//                 该层负责构建一个简单的查找表，用于存储固定尺寸的字典的词嵌入。

//                 该模块常用于存储词嵌入，并通过索引进行访问。该层的输入为索引的列表，输出为对应的词嵌入。

//             ** 层说明 **：

//             ** 层构造参数 **：
//                 num_embeddings    ： 词嵌入字典的尺寸，正整数
//                 embedding_dim     ： 每个嵌入向量的尺寸，正整数
//                 padding_idx       ： 可选参数，如果给定，则在指定索引处，用词嵌入向量填充输出。正整数，默认为 None
//                                         如果指定，则索引处的嵌入向量将被初始化为 0 ，但是后续可对其进行更改。
//                                         但是，词嵌入中该向量的梯度始终为 0

//                 max_norm          ： 如果给出，则对此嵌入向量重新进行归一化，以便获取更小的范数。浮点数，默认为 None
//                 norm_type         ： 指定 max_norm 用的范数类型，默认为 2。可选参数，浮点型
//                 scale_grad_by_freq： 如果给出，这将通过小批量中单词的频率的倒数来缩放梯度。布尔值，默认为 False。
//                 sparse            ： 布尔值，如果给出，则权值矩阵的梯度将为一个稀疏 tensor。
//                                         当前仅有 optim.SGD (CUDA and CPU), optim.SparseAdam (CUDA and CPU) and optim.Adagrad (CPU) 支持稀疏化梯度

//             ** 层输入 **：
//                 LongTensor of arbitrary shape containing the indices to extract

//             ** 层输出 **：
//                 (*, embedding_dim), where * is the input shape

//             ** 模型学习参数 **：
//                 weight (Tensor) – the learnable weights of the module of shape (num_embeddings, embedding_dim)
            
//             ** 示例 **：
//                 embedding = nn.Embedding(10, 3)                    # an Embedding module containing 10 tensors of size 3
//                 input = torch.LongTensor([[1,2,4,5],[4,3,2,9]])    # a batch of 2 samples of 4 indices each
//                 embedding(input)

//                 embedding = nn.Embedding(10, 3, padding_idx=0)
//                 input = torch.LongTensor([[0,2,0,5]])
//                 embedding(input)                                   # 第 0 维 将为 0

//         */
//         "Embedding":{
//             "metaName":"Sparse_layers_metaData",          // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"Embedding",                           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "Embedding",                      // 搜索时对应的关键字
//             "api":"torch.nn.Embedding",                   // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "num_embeddings"     : {"type" : "Positive_Integer",      "value" : ""},
//                 "embedding_dim"      : {"type" : "Positive_Integer",      "value" : ""},
//                 "padding_idx"        : {"type" : "Non_Negative_Integer",  "value" : "None"},
//                 "max_norm"           : {"type" : "Real_(0,inf)",          "value" : "None"},
//                 "norm_type"          : {"type" : "Real_(0,inf)",          "value" : "2"},
//                 "scale_grad_by_freq" : {"type" : "Boolean",               "value" : "False"},
//                 "sparse"             : {"type" : "Boolean",               "value" : "False"},
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "Embedding_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "Embedding_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
//     {
//         /*
//             ** 层功能 **：
//                 根据给定的 2-D FloatTensor 创建一个词嵌入实例

//                 本质上是 Embedding 的一个嵌套类

//             ** 层说明 **：

//             ** 层构造参数 **：
//                 embeddings    ： Tensor 对象，包含用于嵌入的权值的 FloatTensor。第一维被传递给 Embedding 的 num_embeddings 参数。第二维被传递给 embedding_dim 参数
//                 freeze        ： 如果为 true，则在训练过程中，词嵌入将不会更新，等价于 embedding.weight.requires_grad = False。默认为 True
//                 sparse        ： 如果为 True，则 权值参数的梯度矩阵将为稀疏矩阵。

//             ** 层输入 **：
//                 LongTensor of arbitrary shape containing the indices to extract

//             ** 层输出 **：
//                 (*, embedding_dim), where * is the input shape

//             ** 模型学习参数 **：
//                 weight (Tensor) – the learnable weights of the module of shape (num_embeddings, embedding_dim)
            
//             ** 示例 **：
//                 # FloatTensor containing pretrained weights
//                 weight = torch.FloatTensor([[1, 2.3, 3], [4, 5.1, 6.3]])
//                 embedding = nn.Embedding.from_pretrained(weight)
//                 # Get embeddings for index 1
//                 input = torch.LongTensor([1])
//                 embedding(input)   # tensor([[ 4.0000,  5.1000,  6.3000]])

//         */
//         "Embedding_from_pretrained":{
//             "metaName":"Sparse_layers_metaData",          // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"Embedding_from_pretrained",           // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "Embedding_from_pretrained",      // 搜索时对应的关键字
//             "api":"torch.nn.Embedding_from_pretrained",   // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化

            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "embeddings"     : {"type" : "2d_Tensor",   "value" : ""},
//                 "freeze"         : {"type" : "Boolean",     "value" : ""},
//                 "sparse"         : {"type" : "Boolean",     "value" : "None"}
//             },

//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "Embedding_from_pretrained_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "Embedding_from_pretrained_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
//     {
//         /*
//             ** 层功能 **：
//                 Computes sums or means of ‘bags’ of embeddings, without instantiating the intermediate embeddings.

//                 根据 mode 参数的不同，其计算方式不同：
//                     mode="sum"      等价于 Embedding 后紧接着 torch.sum(dim=1)
//                     mode="mean"     等价于 Embedding 后紧接着 torch.mean(dim=1)
//                     mode="max"      等价于 Embedding 后紧接着 torch.max(dim=1)

//                 但是，相对于使用 Embedding 的组合模式，EmbeddingBag 方式更为高效，且更省内存

//             ** 层说明 **：

//             ** 层构造参数 **：
//                 num_embeddings    ： 正整数，表示词嵌入字典的尺寸
//                 embedding_dim     ： 正整数，词嵌入向量的大小
//                 max_norm          ： 如果给出，则对此嵌入向量重新进行归一化，以便获取更小的范数。浮点数，默认为 None
//                 norm_type         ： 指定 max_norm 用的范数类型，默认为 2。可选参数，浮点型
//                 scale_grad_by_freq： 如果给出，这将通过小批量中单词的频率的倒数来缩放梯度。布尔值，默认为 False。
//                 mode              ： 自妇产类型，只能为："sum", "mean" or "max"
//                 sparse            ： 布尔值，如果给出，则权值矩阵的梯度将为一个稀疏 tensor。
//                                         当前仅有 optim.SGD (CUDA and CPU), optim.SparseAdam (CUDA and CPU) and optim.Adagrad (CPU) 支持稀疏化梯度

//             ** 层输入 **：
//                 input (LongTensor) and offsets (LongTensor, optional)
//                     1. 如果输入为： 2-D 尺寸：B * N
//                         也就是，B bags 序列，每个固定长度为 N，它将根据 mode 参数，返回 B 个值。此时，offsets 参数必须为 None。
//                     2. 如果输入为： 1-D 尺寸 N
//                         这将被视为将多个 bags 序列进行 concatenation。此时需要 offset 参数，它为一个 1-D tensor，拼接了输入的每一个 bag 的开始索引。
//                         因此，对于尺寸为 B 的 offset，input 将被视为拥有 B 个 bags。
//                         对于空的 bags（长度为 0） 将会返回用 0 填充的向量。

//             ** 层输出 **：
//                 B x embedding_dim

//             ** 模型学习参数 **：
//                 weight (Tensor) – the learnable weights of the module of shape (num_embeddings, embedding_dim)
            
//             ** 示例 **：
//                 # an Embedding module containing 10 tensors of size 3
//                 embedding_sum = nn.EmbeddingBag(10, 3, mode='sum')
//                 # a batch of 2 samples of 4 indices each
//                 input = torch.LongTensor([1,2,4,5,4,3,2,9])
//                 offsets = torch.LongTensor([0,4])
//                 embedding_sum(input, offsets)    #tensor([[-0.8861, -5.4350, -0.0523], [ 1.1306, -2.5798, -1.0044]])

//         */
//         "EmbeddingBag":{
//             "metaName":"Sparse_layers_metaData",          // 所属的 metaData 的名称
//             "type":"Layer",                               // obj 的类型
//             "name":"EmbeddingBag",                        // 类型名，用于查找，与 key 一致（用于层名显示以及id命名和相关查找，不可有空格）
//             "icon":"resources/test.svg",                  // 该层对应的 icon 地址
//             "keyWord" : "EmbeddingBag",                   // 搜索时对应的关键字
//             "api":"torch.nn.EmbeddingBag",                // 对应的 pytorch api

//             "style":"",                                   // 该 id 对应的 css
//             "Layer_ID": "",                               // 对应层的唯一 id，用于检索和更新参数等等操作，会动态变化
            
            
//             "outShape": [],                               // 每一层的输出尺寸，为一个数组
//             "prev"    : [],                               // 前驱层
//             "next"    : [],                               // 后继层

//             "params":{                                    // 参数（必须与 api 一致）
//                 "num_embeddings"     : {"type" : "Positive_Integer",        "value" : ""},
//                 "embedding_dim"      : {"type" : "Positive_Integer",        "value" : ""},
//                 "max_norm"           : {"type" : "Real_(0,inf)",            "value" : "None"},
//                 "norm_type"          : {"type" : "Real_(0,inf)",            "value" : "2"},
//                 "scale_grad_by_freq" : {"type" : "Boolean",                 "value" : "False"},
//                 "sparse"             : {"type" : "Boolean",                 "value" : "False"},
//                 "mode"               : {"type" : "'sum'_or_'mean'_'max'",   "value" : "mean"},
//             },
//             "funcs":{                                    // 一些函数接口
//                 "Check_Layer_inShape"      : "EmbeddingBag_Check_Layer_inShape",      // 检测输入尺寸是否符合规范
//                 "Update_Layer_outSape"     : "EmbeddingBag_Update_Layer_outSape"      // 计算并更新输出尺寸
//             }
//         },
//     },
// ];