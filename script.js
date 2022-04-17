(function(){
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let fid = 0;
    let foldersArr = [];

    btnAddFolder.addEventListener("click", addFolder);
    loadFolders();

    function addFolder(){
        let fname = prompt("Folder Name");
        if(!fname){
            return;
        }
        fid++;
        addFolderInPage(fname,fid);
        foldersArr.push({
            id : fid
            ,name :fname
        });
        persistFolders();
    }
    function editFolder(){
        let fname = prompt("Enter the new folder name.");
            if(!fname){
                return;
            }
            let divFolder = this.parentNode;
            let divName = divFolder.querySelector("[purpose='name']");
            divName.innerHTML = fname;  
            let folder = foldersArr.find(f => f.id == parseInt(divFolder.getAttribute("fid")));
            folder.name = fname;
            persistFolders();
    }
    function deleteFolder(){
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let flag = confirm("Do you want to delete "+ divName.innerHTML + "?");
        if(flag=true){
            divContainer.removeChild(divFolder);
            let idx = foldersArr.findIndex(f => f.id == parseInt(divFolder.getAttribute("fid")));
            foldersArr.splice(idx,1);
            persistFolders();
        }
    }
    function persistFolders(){
        let fjson = JSON.stringify(foldersArr);
        localStorage.setItem("data",fjson);
    }
    function loadFolders(){
        let fjson = localStorage.getItem("data");
        if(!!fjson){
            foldersArr = JSON.parse(fjson);
            let maxID = -1;
            foldersArr.forEach(function(f) {
                addFolderInPage(f.name,f.id);
                if(f.id > maxID){
                    maxID = f.id;
                }
            });
            f.id = maxID;
        }
    }
    function addFolderInPage(fname, fid){
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate,true); //Creating folder using templates
        let divName = divFolder.querySelector("[purpose='name']");
        let spanDelete = divFolder.querySelector("span[action='delete']"); // Deleting Folder
        let spanEdit = divFolder.querySelector("span[action='edit']"); //Editing Name
        divName.innerHTML = fname;
        divFolder.setAttribute("fid",fid);
        spanDelete.addEventListener("click",deleteFolder);
        spanEdit.addEventListener("click",editFolder); 
        divContainer.appendChild(divFolder);
    }

})();