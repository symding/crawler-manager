class ServiceClass{
    constructor(data){
        this.source_data = data
    }
    name(){
        return this.source_data.Spec.Name
    }
    id(){
        return this.source_data.ID
    }
    task(){
        if (this.source_data.Spec.Mode.Replicated != undefined){
            return this.source_data.Spec.Mode.Replicated.Replicas
        }else{
            return -1
        }
    }
    image(){
        return this.source_data.Spec.TaskTemplate.ContainerSpec.Image.split('@')[0].split('ds-prod/')[1]
    }
    constraints(){
        if (this.source_data.Spec.TaskTemplate.Placement.Constraints != undefined){
            return this.source_data.Spec.TaskTemplate.Placement.Constraints
        }else{
            return []
        }
        
    }
    mounted(){
        let result = []
        if (this.source_data.Spec.TaskTemplate.ContainerSpec.Mounts!=undefined){
            for (var item of this.source_data.Spec.TaskTemplate.ContainerSpec.Mounts){
                result.push(item)
            }
            return result
        }else{
            return result
        }
    }
    table_data(){
        return {
            Name:this.name(),
            ID:this.id(),
            Task:this.task(),
            Image:this.image(),
            Constraints:this.constraints(),
            Mounted:this.mounted()
        }
    }
}


module.exports = ServiceClass;