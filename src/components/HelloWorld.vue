<template>

        <div class="tree-box">  
            <div class="zTreeDemoBackground left">  
                <ul id="treeDemo" class="ztree"></ul>  
            </div>  
        </div>  
  
</template>

<script>

export default {
  data () {
    return {
       setting:{  
              check: {    
                    enable: false,    
                    nocheckInherit: false ,  
                    // chkboxType: { "Y": "p", "N": "s" }   
                },    
                data:{
                  simpleData: {
                    enable: true,//数据格式为简单模式
                    // idKey: "id",//节点数据中保存唯一标识的属性名称
                    // pIdKey:"pid",//节点数据中保存其父节点唯一标识的属性名称
                    // rootPId:0,//用于修正根节点父节点数据，即 pIdKey 指定的属性值
                  }
               },
               edit: {
                  enable: true,
                  editNameSelectAll:false,
                  showRemoveBtn:this.showRenameBtn,  //删除图标
                  removeTitle: "删除节点",
                  showRenameBtn:this.showRemoveBtn,  //编辑图标
                  renameTitle: "编辑节点",
                  drag:{
                    isCopy:false,
                    isMove:false
                  }
                },
                callback: {  
                     beforeRemove: this.beforeRemove,		//捕获节点删除回调函数，根据返回值是否删除
					           beforeRename: this.beforeRename,	//用于捕获节点编辑回调函数，根据返回值是否操作
                },
                view:{
        					addHoverDom: this.addHoverDom, //鼠标指向时显示
        					removeHoverDom: this.removeHoverDom,//鼠标移除时隐藏
        					selectedMulti: false
        				},
                  
        },

        zNodes:[  
              { name:"父节点1 - 展开", open:true,  
                  children: [  
                      { name:"父节点11 - 折叠",  
                          children: [  
                              { name:"叶子节点111"},  
                              { name:"叶子节点112"},  
                              { name:"叶子节点113"},  
                              { name:"叶子节点114"}  
                          ]},  
                      { name:"父节点12 - 折叠",  
                          children: [  
                              { name:"叶子节点121"},  
                              { name:"叶子节点122"},  
                              { name:"叶子节点123"},  
                              { name:"叶子节点124"}  
                          ]},  
                      { name:"父节点13 - 没有子节点", isParent:true}  
                  ]},  
              { name:"父节点2 - 折叠",  
                  children: [  
                      { name:"父节点21 - 展开", open:true,  
                          children: [  
                              { name:"叶子节点211"},  
                              { name:"叶子节点212"},  
                              { name:"叶子节点213"},  
                              { name:"叶子节点214"}  
                          ]},  
                      { name:"父节点22 - 折叠",  
                          children: [  
                              { name:"叶子节点221"},  
                              { name:"叶子节点222"},  
                              { name:"叶子节点223"},  
                              { name:"叶子节点224"}  
                          ]},  
                      { name:"父节点23 - 折叠",  
                          children: [  
                              { name:"叶子节点231"},  
                              { name:"叶子节点232"},  
                              { name:"叶子节点233"},  
                              { name:"叶子节点234"}  
                          ]}  
                  ]},  
              { name:"父节点3 - 没有子节点", isParent:true}  
        ]
    }
  },

  mounted(){  
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes); 
  },

  methods:{
        //是否显示编辑按钮
         showRenameBtn(treeId, treeNode){
                //获取节点所配置的noEditBtn属性值判断是否显示
                if(treeNode.noEditBtn != undefined && treeNode.noEditBtn){
                    return false
                }else {
                    return true
                }
            },

            //是否显示删除按钮
             showRemoveBtn(treeId, treeNode){
                //获取节点所配置的noRemoveBtn属性值
                if(treeNode.noRemoveBtn != undefined && treeNode.noRemoveBtn){
                    return false;
                }else{
                    return true;
                }
            },
            //删除回调
            beforeRemove(treeId, treeNode){
                if(confirm("确认删除" + treeNode.name + " 吗？")){
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                        zTree.removeNode(treeNode);
                } else{
                    alert("删除失败");
                    return false;
                }
            }, 
            //编辑回调
            beforeRename(treeId, treeNode, newName){
                if(newName.length==0){
                    alert("能力不能为空");
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    zTree.cancelEditName();//内容为空取消节点编辑状态返回之前的名称
                    return false;
                }else{return true}
            },

    //自定义添加部分
            //是否显示添加按钮
            showAddBtn(treeNode){
                    return false;
            },
            //移出时隐藏按钮
            removeHoverDom(treeId, treeNode){
                 $("#addBtn_"+treeNode.id).unbind().remove();
            },

            //增加添加按钮
            addHoverDom(treeId, treeNode,newName){
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_"+treeNode.id).length>0) {return;}
                // if(!this.showAddBtn(treeNode)){return;}
                var addStr = "<span class='button add' id='addBtn_" + treeNode.id
                    + "' title='add node' onfocus='this.blur();'></span>";
                sObj.after(addStr);

                var btn = $("#addBtn_"+treeNode.id);
                btn.bind('click',function(){
                      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                      var nodes;
                      nodes=zTree.addNodes(treeNode, {"id":1, "pId":1,"name":"新建地点"},false);
                })
            },
  }  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>-->
<style src="../../plugins/metroStyle.css">
</style>


