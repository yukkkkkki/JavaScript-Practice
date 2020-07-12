// 二叉树：树中每个节点最多只能有两个子节点
// 二叉树可以为空

// 特性
// 第i层最大节点数：2^(i-1), i >= 1;
// 深度为k的二叉树有最大节点总数为：2^k - 1, k >= 1;
// 对任何非空二叉树T，若n0表示叶节点的个数，n2是度为2的非叶节点个数，那么两者免租关系n0 = n2 + 1;

// 满二叉树：节点全满
// 完全二叉树:除二叉树最后一层外,其他各层的节点数都达到最大个数
//          且最后一层从左向右的叶节点连续存在，只缺右侧若干节点

// 二叉树的存储：常见方法是数组和链表

// 二叉搜索树(BST:二叉排序树)
// 特性:
// 非空左子树的所有键值小于其根节点的键值
// 非空右子树的所有键值大于其根节点的键值
// 左、右子树本身也都是二叉搜索树
class Node {
  constructor() {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 向树中插入一个新的键
  insert(key) {
    // 根据key创建node节点
    const newNode = new Node(key);

    // 若原来的树是一棵空树
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key > node.key) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    }
  }

  // 先序遍历二叉树 根节点->左节点->右节点
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }

  preOrderTraverseNode(node) {
    if (node === null) return;
    console.log(node.key);
    this.preOrderTraverseNode(node.left);
    this.preOrderTraverseNode(node.right);
  }

  // 中序遍历二叉树 左节点->根节点->右节点
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }
  inOrderTraverseNode(node) {
    if (node === null) return;
    this.inOrderTraverseNode(node.left);
    console.log(node.key);
    this.inOrderTraverseNode(node.right);
  }

  // 后序遍历二叉树 左节点->右节点->根节点
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }
  postOrderTraverseNode(node) {
    if (node === null) return;
    this.postOrderTraverseNode(node.left);
    this.postOrderTraverseNode(node.right);
    console.log(node.key);
  }

  // 最小值
  min() {
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  // 最大值
  max() {
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node === null) return false;

    // 判断搜索的key和结点值的关系
    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.left) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  search2(key) {
    let node = this.root;
    while (node !== null) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  }

  // 删除
  remove(key) {
    let current = this.root;
    let parent = null;
    let isLeftChild = true;

    while (current.key !== key) {
      parent = current;
      if(key < parent.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }
      if(current === null) return false;
    }
    // 找到节点：current
    // 情况一：删除的节点是叶子节点(没有子节点)
    if(current.left === null && current.right === null) {
      if(current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    //情况二：删除的节点只有一个子节点
    else if(current.right === null) {
      // 只有左子节点
      if(current == this.root) {
        this.root = current.left
      } else if(isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    } else if(current.left === null) {
      // 只有右子节点
      if(current == this.root) {
        this.root = current.right;
      } else if(isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    }
    return true;
  }

  // 情况三：
  
  // 获取特定的值
}
