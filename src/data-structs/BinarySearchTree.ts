import { TreeNode } from "./TreeNode";

export class BinarySearchTree {

    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(value: number) {
        let newNode = new TreeNode(value);

        if(this.root === null) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while(current) {
            if(value === current.value) return undefined;
            if(value < current.value) {
                if(current.left === null){
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if(current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    find(value: number ){
        if(!this.root) return false
        
        let current: TreeNode | null = this.root
        let found: boolean | TreeNode= false

        while(current && !found){
              if(value < current.value){
                current = current.left
               } else if(value > current.value){
                  current = current.right
               } else {
                    found = current
               } 
              
              }
      
          if(!found) return undefined;
          return found;
    }
}