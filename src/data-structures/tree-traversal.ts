export class Node {

    left: Node = null
    right: Node = null
    value: number

    constructor(value: number) {
        this.value = value
    }

}

class BST {

    root: Node = null

    constructor() {
    }

    insert(value: number) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let temp = this.root;
        while (true) {
            if (newNode.value === temp.value) return undefined;
            if (newNode.value < temp.value) {
                if (temp.left === null) {
                    temp.left = newNode;
                    return this;
                }
                temp = temp.left;
            } else {
                if (temp.right === null) {
                    temp.right = newNode;
                    return this;
                }
                temp = temp.right;
            }
        }
    }

    contains(value: number) {
        if (this.root === null) return false;
        let temp = this.root;
        while (temp) {
            if (value < temp.value) {
                temp = temp.left;
            } else if (value > temp.value) {
                temp = temp.right;
            } else {
                return true;
            }
        }
        return false;
    }

    minValueNode(currentNode: Node) {
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode;
    }

    BFS(): number[] {
        if (!this.root) return []

        const queue: Node[] = []
        const result: number[] = []

        queue.push(this.root)
        while (queue.length) {
            const item = queue.shift()
            result.push(item.value)
            if (item.left) queue.push(item.left)
            if (item.right) queue.push(item.right)
        }
        return result
    }

    DFSPreOrder(): number[] {
        const result: number[] = []

        function traverse(node: Node) {
            result.push(node.value)
            if (node.left) traverse(node.left)
            if (node.right) traverse(node.right)
        }
        traverse(this.root)
        return result
    }

    DFSPostOrder(): number[] {
        const result: number[] = []

        function traverse(node: Node) {
            if (node.left) traverse(node.left)
            if (node.right) traverse(node.right)
            result.push(node.value)
        }
        traverse(this.root)
        return result
    }



}



let myTree = new BST();

myTree.insert(47);
myTree.insert(21);
myTree.insert(76);
myTree.insert(18);
myTree.insert(27);
myTree.insert(52);
myTree.insert(82);
