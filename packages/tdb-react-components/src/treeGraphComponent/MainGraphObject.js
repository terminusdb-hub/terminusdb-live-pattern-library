import * as NODE_ACTION_NAME from './utils/actionType';
import {removeElementToArr,getPropertyType} from './utils/modelTreeUtils'
import {formatData,
		formatProperties,
		formatDataForTreeChart,
		checkInheritance,
		OrdinaryClassObj,
		EntityClassObj,
		availableParentsList,addObjectPropertyRangeItem,
		addElementToPropertyList} from './FormatDataForTree';
import {getNewNodeTemplate,getNewPropertyTemplate} from './utils/modelTreeUtils'
import {graphUpdateObject} from './utils/graphUpdateObject';
import {CLASS_TYPE_NAME} from './utils/elementsName' 
import { element } from 'prop-types';

export const MainGraphObject = (mainGraphDataProvider,dbName)=>{

	//set current node
	let _currentNode = null
	
	let _objectTypeList=[];

	let _documentTypeList=[];

	let _objectChoiceList =[]

    /*
    * the list of all the property
    */
	//let _propertiesList=new Map();
	
	/*
	* properties organized by domain
	* all the properties of a class
	* {domaidName:[{propertyObj001},{propertyObj002}]}
	*/
	let _domainToProperties={};

	/*
	* the list of all the class for the link properties
	*/
	let _objectPropertyList=[];

	/*
	* Link Properties/Enum Property organized by range
	* {linkedClass:[{nodeName:classId,propertyName:key}]
	* LINK PROPERTIES
	*/
	let _objectPropertyToRange={};

	/*
	* all the node elements
	*/
	let _rootIndexObj={}

	let _descendantsNode=new Map();

	let _mainGraphElementsJson={};

	const deleteDocList = []
	/*
	* this object registers all the graph changes 
	*/
	//let _graphUpdateObject= new graphUpdateObject();

	//const currentNode = {}

	const getElementsNumber=()=>{
		return {//properties:_propertiesList.size,
		        entities:_documentTypeList.length,
		        classes:_objectTypeList.length,
		    	choiceClasses:_objectChoiceList.length}
	}

	const getObjectProperties=()=>{
		return _objectPropertyList;
	}

	const getObjectChoices=()=>{
		return _objectChoiceList;
	}

	const getRoot=(type=null)=>{
		switch(type){
			case CLASS_TYPE_NAME.OBJECT_CLASS:
			//case CLASS_TYPE_NAME.OBJECT_CLASSES:
				//return _rootIndexObj[CLASS_TYPE_NAME.OBJECT_CLASSES]
			case CLASS_TYPE_NAME.DOCUMENT_CLASS:
			case CLASS_TYPE_NAME.DOCUMENT_CLASSES:
				return _rootIndexObj[CLASS_TYPE_NAME.DOCUMENT_CLASSES]
			case CLASS_TYPE_NAME.CHOICE_CLASS:
			case CLASS_TYPE_NAME.CHOICE_CLASSES:
				return _rootIndexObj[CLASS_TYPE_NAME.CHOICE_CLASSES];
			default:
			 	return _rootIndexObj.ROOT;
		}		
	}

	const objectPropertyToRange=()=>{
		return _objectPropertyToRange;
	}

	const getObjPropsRelatedToClass=(nodeId)=>{
		if(_objectPropertyToRange[nodeId]){
			return _objectPropertyToRange[nodeId]
		}
		return []
	}

	const getDescendantsNode=()=>{
		return _descendantsNode;
	}

	const getObjectProperty = (nodeId,proName)=>{
		const objProperties = (nodeId)
		return objProperties[proName]
	}

	/*
	* maybe I have to get it from _descendantsNode
	* maybe change in setCurrentNode ?? check the use 
	*/
	const getElement=(key,setCurrent=true)=>{
		if(_rootIndexObj && _rootIndexObj[key]){
			if(setCurrent)_currentNode = _rootIndexObj[key]
			return _rootIndexObj[key];
		}
		return undefined;
	}

	
	const createNewMainGraph=()=>{
		_mainGraphElementsJson=mainGraphDataProvider;
		const {rootIndexObj,linkPropertyClasses}=formatData(mainGraphDataProvider,dbName);		
		_rootIndexObj=rootIndexObj
		//_objectPropertyToRange=linkPropertyClasses
		
		//const[propertyByDomain,objectPropertyRange,propertiesList]=formatProperties(mainGraphDataProvider.propsResult,mainGraphDataProvider.restResult,_rootIndexObj);		
		//_domainToProperties=propertyByDomain;
		//_objectPropertyToRange=objectPropertyRange;

		//can not works different class can have the same property 
		//_propertiesList=propertiesList;
		
		formatDataForTree()
	}

	createNewMainGraph();
	
	const getAvailableParentsList=(nodeId)=>{
		const nodeObject=getElement(nodeId);
		return  availableParentsList(nodeObject,_objectTypeList,_documentTypeList,_rootIndexObj)
	}

	const addNewPropertyToClass = (nodeName, propertyType)=>{
		if(nodeName!==null && _rootIndexObj[nodeName]){ 
			const newProperty=getNewPropertyTemplate(propertyType) //_graphUpdateObject.addPropertyToClass(nodeName,propertyType,propertyRange);
			if(!_domainToProperties[nodeName]){
				_domainToProperties[nodeName]=[];
			}
			_domainToProperties[nodeName].unshift(newProperty);
			//_propertiesList.set(newProperty.name,newProperty);
			return  _domainToProperties[nodeName].slice();
		}
		return [];
	}


	const nodeApplyAction=(actionName,nodeName)=>{
		if(nodeName!==null && _rootIndexObj[nodeName]){ 
            //the current selected node 
			let currentNode=_rootIndexObj[nodeName];
            
			let elementType=currentNode.type;
            let actionType=actionName;         
   			let isChoiceClass= false;

            switch (actionName){
              case NODE_ACTION_NAME.ADD_NEW_ENTITY:
                   elementType=CLASS_TYPE_NAME.DOCUMENT_CLASS;
                   nodeName=CLASS_TYPE_NAME.DOCUMENT_CLASSES;
                   /*
                   * I get as currentNode the DocumentClasses node 
                   */
                   currentNode=getRoot(nodeName);
                   
                   actionType=NODE_ACTION_NAME.ADD_CHILD;
                   
                   break;
              case NODE_ACTION_NAME.ADD_NEW_CLASS:
                   elementType=CLASS_TYPE_NAME.OBJECT_CLASS
                   nodeName=CLASS_TYPE_NAME.DOCUMENT_CLASSES
                   currentNode=getRoot(nodeName);
                   actionType=NODE_ACTION_NAME.ADD_CHILD;                 
                   break;

              case  NODE_ACTION_NAME.ADD_NEW_CHOICE_CLASS:
              		elementType=CLASS_TYPE_NAME.CHOICE_CLASS
                    nodeName=CLASS_TYPE_NAME.CHOICE_CLASSES
                    currentNode=getRoot(elementType)
                    actionType=NODE_ACTION_NAME.ADD_CHILD
              		isChoiceClass=true
              		break
            }
        	 let newNodeObj={};
        	 if(actionName===NODE_ACTION_NAME.ADD_PARENT){

        	 	/*
        	 	*I have two case current node child of one Group Node
        	 	*NEW PARENT IS CHILD OF Group Node and has as child the currentNode
        	 	*/
        	 	const rootParentNode=getRoot(elementType);

        	 	newNodeObj=getNewNodeTemplate(null,elementType)
				 
				 //_graphUpdateObject.addNodeToTree(rootParentNode,currentNode);
        		

        	 	rootParentNode.children.push(newNodeObj);

        	 	newNodeObj.children.push(currentNode);
        	 	newNodeObj.allChildren.push(currentNode);  

				currentNode.parents.push(newNodeObj.name)
				//I can not add in the inherits because I do not have the node id 
				
				//=currentNode.id

        	 	/*
    	 		* check if I have to remove the child from the root node
    	 		*/
        	 	removeChildFromRoot(currentNode)
        	 	
        	 	nodeName=rootParentNode.name;
        	 }else{
				//add children action 
        	 	newNodeObj=getNewNodeTemplate(null,elementType)//_graphUpdateObject.addNodeToTree(currentNode,null,isChoiceClass);

        	 	if(currentNode.type==="Group"){
					//not need to add in the schema 
        	 		currentNode.children.push(newNodeObj);
	        	}else {
	        		/*
	        		* currentNode is the parent node
	        	 	*/
	        	 	currentNode.children.push(newNodeObj);
	        	 	currentNode.allChildren.push(newNodeObj);
					
					newNodeObj.schema['@inherits']=currentNode.id
					//name is the node name it can be different form the id
					//we use name for identify in unique way the node
					newNodeObj.parents.push(currentNode.name)

	        	}
        	 }
        	 _rootIndexObj[newNodeObj.name]=newNodeObj;

        	 /*
        	 * to be review...
        	 */
        	 addNodeToclassList(newNodeObj);
        	 
        	 setNewElementPosition(nodeName,newNodeObj);
        	 return newNodeObj;
         }
	}

	const addNodeToclassList=(elementObj)=>{
		switch(elementObj.type){
			case CLASS_TYPE_NAME.DOCUMENT_CLASS:
				_documentTypeList.push(elementObj.name)
				addElementToPropertyList(elementObj,_objectPropertyList);
				break;
			case CLASS_TYPE_NAME.OBJECT_CLASS:
				_objectTypeList.push(elementObj.name)
				addElementToPropertyList(elementObj,_objectPropertyList);
				break;
			case CLASS_TYPE_NAME.CHOICE_CLASS:
				addElementToPropertyList(elementObj,_objectChoiceList);
				break;
				//_classesList.set(elementObj.name,{value:node.data.name,name:node.data.name,label:node.data.label});
		}
	}
	
	/*
    *I have to check if the new parent and the node have the same parents.....
    *in this case I have to remove the direct parent
    */
    const checkRelatedParents=(elementObjClass,parentObjClass)=>{
    	parentObjClass.parents.forEach((parentName)=>{
    		const parentOfParentObj=_rootIndexObj[parentName];
    		const parentRelated=removeElementToArr(elementObjClass.parents,parentName);    		
	    	if(parentRelated){
	    		
	    		/*
	    		* remove child from parent
	    		*/
	    		removeElementToArr(parentOfParentObj.children,elementObjClass.name)
	    		if(parentOfParentObj.allChildren){
	    			removeElementToArr(parentOfParentObj.children,elementObjClass.name)
	    		}
				/*
				* register to be save to schema
				*/
				_graphUpdateObject.changeNodeParent(elementObjClass.name,parentName,NODE_ACTION_NAME.REMOVE_PARENT)
	    	}
	    	checkRelatedParents(elementObjClass,parentOfParentObj)
	    })
	}


	const updateNodeParents=(elementName,parentName,actionName)=>{
	   const elementObjClass=_rootIndexObj[elementName];
	   const parentObjClass=_rootIndexObj[parentName];
	   
	   checkRelatedParents(elementObjClass,parentObjClass);

	   _graphUpdateObject.changeNodeParent(elementName,parentName,actionName);

	   if(actionName===NODE_ACTION_NAME.ADD_PARENT){
			//the node could be children of another node or children of root node 
			if(parentObjClass.type===elementObjClass.type){
				  removeChildFromRoot(elementObjClass);
				  if(elementObjClass.parents.length===0){
					parentObjClass.children.push(elementObjClass);
				  }
			}			
			elementObjClass.parents.push(parentObjClass.name);
			parentObjClass.allChildren.push(elementObjClass);

		}else{
			removeElementToArr(elementObjClass.parents,parentName);
			removeElementToArr(parentObjClass.children,elementName);
			if(parentObjClass.allChildren)
				removeElementToArr(parentObjClass.allChildren,elementName);

			/*
			* if the parents array is empty I move the node under the root group
			*/
			if(elementObjClass.parents.length===0){
				parentName=addToParentGroup(elementObjClass)
			}else if(elementObjClass.type===CLASS_TYPE_NAME.DOCUMENT_CLASS){
				const docParent=elementObjClass.parents.findIndex((pName)=>{
							const pElement=_rootIndexObj[pName];

							return pElement.type===CLASS_TYPE_NAME.DOCUMENT_CLASS
						})
				if(docParent===-1){
					parentName=addToParentGroup(elementObjClass)
				}
			}
		}
		/*
		* this is for save the change
		*/
		moveNodeUnderParent(parentName,elementName);
		return elementObjClass;
	}

	const addToParentGroup=(elementObjClass)=>{
		const parentRoot=getRoot(elementObjClass.type);
		parentRoot.children.push(elementObjClass);
		if(elementObjClass.type==='Document'){
			_graphUpdateObject.changeNodeParent(elementObjClass.name,'Document',NODE_ACTION_NAME.ADD_PARENT);
		}
		return parentRoot.name;
	}

	const _removeClassElement=(elementName)=>{
		const classElement=_rootIndexObj[elementName];
		if(classElement){
			/*
			*register the remove 

			*/		
			/*
			* if this is an UNDO action (ex UNDO of add Parent)
			* I could remove a node with a child
			* so I have to move the child node under 
			* a new parent before delete it 
			*/
			/*	if(classElement._childrenObj.size>0){
				for (let childObj of classElement._childrenObj.values()){
					updateNodeParents(childObj.id,elementName,NODE_ACTION_NAME.REMOVE_PARENT)
				}
			}*/

			
			// I have to remove the node from the nodeParents list
			
			classElement.parents.forEach((parentName)=>{
				const parentObj=_rootIndexObj[parentName];
				removeElementToArr(parentObj.children,elementName)
				if(parentObj.allChildren)
					removeElementToArr(parentObj.allChildren,elementName)
			})

			/*
			* I have to remove from the itemlists
			*/
			delete _rootIndexObj[elementName];
			const nodeElement=_descendantsNode.get(elementName);			
			_descendantsNode.delete(elementName);
			
			switch(classElement.type){
				case CLASS_TYPE_NAME.OBJECT_CLASS:
					removeElementToArr(_objectTypeList,elementName)
					removeElementToArr(_objectPropertyList,elementName) //_classesList.delete(elementName);
					break;
			    case CLASS_TYPE_NAME.DOCUMENT_CLASS:
			    	removeElementToArr(_documentTypeList,elementName)
			    	removeElementToArr(_objectPropertyList,elementName)
			    	break;
			    case CLASS_TYPE_NAME.CHOICE_CLASS:
			    	removeElementToArr(_objectChoiceList,elementName)
			}

			_graphUpdateObject.removeNode(classElement)

			// I need the node element for UNDO action
			//return nodeElement;
		}
	}

	/*
	* I can remove a node if it hasn't
	* children and it is not a target in a relationship 
	* (this node can not be a range in a property link)
	*/
	const removeElementInMainGraph=(elementName)=>{
		//delete all the element related property object
		const listOfProperty=_domainToProperties[elementName] ? _domainToProperties[elementName].slice() : [];
		if(listOfProperty.length>0){
			listOfProperty.forEach((property,key)=>{
				removePropertyToClass(elementName,property.name);
			})
			
		}
		return _removeClassElement(elementName);
	}


	const removePropertyToClass=(domainClassName,propertyName)=>{
		const propertyByDomain=_domainToProperties[domainClassName] || [];	
		
		//remove by domain
		const propertyObject=removeElementToArr(propertyByDomain,propertyName)
		
		// remove by range
		const propertyByRange=_objectPropertyToRange[propertyObject.range];
		if(propertyByRange)
			removeElementToArr(propertyByRange,propertyName);
		
		//remove from the json Object
		if(currentNode[propertyName]){
			delete currentNode[propertyName]
		}
		
		return propertyByDomain.slice();
	}

	/*
      *if I remove a parent 
      *I have to remove child from parent too(children Obj)  
      */
    const removeChildFromRoot=(currentNode)=>{
      	const rootNode=getRoot(currentNode.type);
      	if(!rootNode.children || rootNode.children.length===0)return;
      	removeElementToArr(rootNode.children,currentNode.name);
    }
    

    const moveNodeUnderParent=(parentId,nodeId)=>{
    	let parentNode=_descendantsNode.get(parentId);
    	let elementNode=_descendantsNode.get(nodeId);
        elementNode.parent=parentNode
        elementNode.depth=parentNode.depth+1;
        elementNode.x=parentNode.x+100;
        elementNode.y=parentNode.y+100;
    }

	const setNewElementPosition=(parentId,newNodeObj,asType)=>{
		let parentNode=_descendantsNode.get(parentId);
        let yStep=parentNode.y+100;
        let xStep=parentNode.x+100;
        let newNode={}
        newNode.parent=parentNode
        newNode.depth=parentNode.depth+1;
        newNode.x=xStep;
        newNode.y=yStep;
        newNode.data=newNodeObj;
        _descendantsNode.set(newNodeObj.name,newNode);
	}

	const getPropertyListByDomain=(domainClassName)=>{
		if(_domainToProperties[domainClassName]) return _domainToProperties[domainClassName];
		return []
	}

	function formatDataForTree(){
		const [descendantsNode, 
			  objectTypeList,
			  documentTypeList,
			  objectPropertyList,
			  objectChoiceList] = new formatDataForTreeChart(getRoot());
		_descendantsNode=descendantsNode;
		//_classesList=classesList;
		//_entitiesList=entitiesList;
		_documentTypeList=documentTypeList
		_objectTypeList=objectTypeList
		_objectPropertyList=objectPropertyList;
		_objectChoiceList=objectChoiceList;

		const  [propertiesOfClass,linkPropertyClass] = formatProperties(_mainGraphElementsJson,_objectPropertyList,_objectChoiceList)
		_domainToProperties=propertiesOfClass
		_objectPropertyToRange=linkPropertyClass
	}


	const savedObjectToWOQL=()=>{
		const updateList=[]
		const newElementList=[]
		Object.values(_rootIndexObj).forEach(item=>{
			if(item.needToSave===true ){
				if(item.newElement===false){
					updateList.push(item.schema)
				}else{
					newElementList.push(item.schema)
				}
			}
		})
		return {deleteList : deleteDocList,updateList:updateList,newElementList:newElementList}
	}

	const updateObjectPropertyListLabel=(objectPropList,elementDataObject)=>{
		const index=objectPropList.findIndex(function(item){
			if(item.name===elementDataObject.name){
				item.label=elementDataObject.id 
			}
			return item.name===elementDataObject.name
			})     	
	}


	const getObjectTypeList=()=>{
		return _objectTypeList;
	}

	const getDocumentTypeList=()=>{
		return _documentTypeList;
	}
	
	// new functions
	const getClassKey=()=>{
		if(_currentNode.schema['@key']){
			const keyObj= _currentNode.schema['@key'];
			return {type : keyObj["@type"],fields: keyObj['@fields'] || []}
		}
		return {type:'Lexical',fields:[]}
	}

	const setClassKey=(type,fields)=>{
		_currentNode.schema['@key']={}
		if(type)_currentNode.schema['@key']['@type']=type
		if(fields)_currentNode.schema['@key']['@fields']=fields
		_currentNode.needToSave=true
	}
	
	const getPropertyAsList=()=>{
		const id= _currentNode['name']
		const proArr=[]
		if(_domainToProperties[id]){
			Object.values(_domainToProperties[id]).forEach(element=>{
				proArr.push({label:element.id,value:element.id})
			})
			return proArr
		}
		return []
	}
	/*
	"@properties" : [
      { "aliases" : "An (ordered) list of pseudonyms" },
      { "name" : "The name of the criminal" }
    ] }*/

	const getNodeData = () =>{
		let node = {}
		if(_currentNode.schema){
			
			const doc = _currentNode.schema['@documentation']
			if(doc){
				node.comment = doc['@comment'] || ''
			}
			node.abstract=_currentNode.schema['@abstract'] ? true : false
			node.id = _currentNode.schema['@id'] || ''
			node.subdocument = _currentNode.schema['@subdocument'] ? true : false
		}

		return node
	} 	


	const setComment=(value,propertyname)=>{
		if(_currentNode.schema){
			if(!_currentNode.schema['@documentation']){
				_currentNode.schema['@documentation'] = {}
			}
			_currentNode.schema['@documentation']['@comment']=value
			_currentNode.needToSave=true
		}
	}

	const setSubdocument = (value) =>{
		if(value === true ){
			_currentNode.type = CLASS_TYPE_NAME.OBJECT_CLASS
			_currentNode.schema['@subdocument']=[]
		}else if(_currentNode.schema['@subdocument']){
			_currentNode.type = CLASS_TYPE_NAME.DOCUMENT_CLASS
			delete _currentNode.schema['@subdocument'];
		}
	}


	const setAbstract = (value)=>{
		if(_currentNode.schema){
			if(value === true ){
				_currentNode.schema['@abstract']=[]
			}else if(_currentNode.schema['@abstract']){
				delete _currentNode.schema['@abstract'];
			}
		}
	}


	const setId = (newId,classPropertyObj,defaultRange)=>{
		if(!_currentNode.schema) return 
		if(!defaultRange){
			 _currentNode.id =newId
			 _currentNode.schema['@id'] =  newId
			 _currentNode.needToSave = true
			//review childName
			if(_currentNode.newElement === true && _currentNode.allChildren.length>0){
				_currentNode.allChildren.forEach((childElement)=>{
					const inherits = []
					childElement.parents.forEach((parentName)=>{
						const parentElement = _rootIndexObj[parentName]
						inherits.push(parentElement.id)
					})
					childElement.schema['@inherits']= inherits.length === 1 ? inherits[0] : inherits 
				})				
			}
			//change the label in the list of object for the link properties
			updateObjectPropertyListLabel(_objectPropertyList,_currentNode)
		}
	}
	

	const setPropertyId = (propertyObj, newPropId, rangePropValue) =>{
		const oldPropId = propertyObj.id
		let currentPropertyValue = _currentNode.schema[oldPropId] 
		if(currentPropertyValue!== undefined){
			delete _currentNode.schema[oldPropId]
		}
		_currentNode.schema[newId] = currentPropertyValue || defaultRange
	}

	const getEnumValues =()=>{
		if(_currentNode.schema['@value']){
			return _currentNode.schema['@value']
		}
		return []
	}

	const getPropertyInfo = (propId)=>{
		let obj = {}
		switch(typeof _currentNode.schema[propId]){
			case 'string':
				obj= {range:_currentNode.schema[propId],option:'',id:propId}
				break;
			case 'object':
				const propInfo = _currentNode.schema[propId]
				obj = {range:propInfo['@class'],option:propInfo['@type'],id:propId} 				
				if(propInfo['@type'] === 'Cardinality'){
					obj['cardinality'] = propInfo['@cardinality']
				}else if(propInfo['@type'] === 'Cardinality_Between'){
					obj['min_cardinality'] = propInfo['@min_cardinality']
					obj['max_cardinality'] = propInfo['@max_cardinality']
				}
				break
			default:
				obj= {id:propId}
		}
		obj['comment'] = getPropertyComment(propId)
		return obj

	}
	//range 
	//option
	//what happen if I change something before setting the id???
	const setPropertyInfo = (propId,fieldName,fieldValue)=>{
		if(!_currentNode.schema[propId])return
		switch(fieldName){
			//this is the property's type like string, num ....
			case 'range':{
				if( _rootIndexObj[fieldValue]!==undefined){
					const oldRange = typeof _currentNode.schema[propId] === 'object' ? _currentNode.schema[propId]['@class'] : _currentNode.schema[propId] 
					addObjectPropertyRangeItem(_objectPropertyToRange,_currentNode.name,propId,fieldValue,oldRange)
				}
				if(typeof _currentNode.schema[propId] === 'string'){
					_currentNode.schema[propId]=fieldValue
				}else{
					_currentNode.schema[propId]['@class']=fieldValue
				}
				
				break

			}
			//like Optional, Cardinality, Cardinality_beetween,List ...
			case 'option':{
				if(fieldValue === 'Null'){
					//remove extra options
					if(typeof _currentNode.schema[propId] === 'object'){
						const currentClass = _currentNode.schema[propId]['@class']
						_currentNode.schema[propId]=currentClass
					}
				}else if(typeof _currentNode.schema[propId] === 'string'){
					const currentClass = _currentNode.schema[propId]
					_currentNode.schema[propId]={'@class':currentClass,'@type':fieldValue}
				}else{
					const currentClass = _currentNode.schema[propId]['@class']
					_currentNode.schema[propId]={'@class':currentClass,'@type':fieldValue}
				}
				break;
			}
			//if we enter at this point the element is an object
			case 'max_cardinality':
			case 'min_cardinality':
			case 'cardinality':{
				_currentNode.schema[propId][`@${fieldName}`]=fieldValue
				break;
			}
			case 'comment':
				setPropertyComment(propId,fieldValue)
			    break
		}
		_currentNode.needToSave = true
	}

	const setPropertyComment = (propId,comment) =>{
		if(!_currentNode.schema['@documentation'])_currentNode.schema['@documentation']={}
		if(!_currentNode.schema['@documentation']['@properties'])
			_currentNode.schema['@documentation']['@properties']={}
		if(comment && comment.trim()!==''){
			_currentNode.schema['@documentation']['@properties'][propId]=comment
		}else if(_currentNode.schema['@documentation']['@properties'][propId]){
			delete _currentNode.schema['@documentation']['@properties'][propId]
		}
		//properties
	}

	const getPropertyComment = (propId) =>{
		if(_currentNode.schema['@documentation'] && 
		   _currentNode.schema['@documentation']['@properties'] &&
		   _currentNode.schema['@documentation']['@properties'][propId]){
			return _currentNode.schema['@documentation']['@properties'][propId]
		}
		return ''
		//properties
	}

	const updateEnumValues = (enumArr) =>{
		_currentNode.schema['@value'] = enumArr
	}


	return {setId,getPropertyInfo,setPropertyInfo,getNodeData,
			objectPropertyToRange,setClassKey,getPropertyAsList,getClassKey,
			setComment,setAbstract,setSubdocument,setPropertyId,
			getEnumValues,updateEnumValues,getObjectProperty,
			getObjectChoices,
			getObjectTypeList,
			getDocumentTypeList,
			getElementsNumber,getElement,getPropertyListByDomain,getObjPropsRelatedToClass,getAvailableParentsList,
      nodeApplyAction,addNewPropertyToClass,removePropertyToClass,
      updateNodeParents,savedObjectToWOQL,getObjectProperties,getDescendantsNode,removeElementInMainGraph}
}
