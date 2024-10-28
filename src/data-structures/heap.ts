export class Heap {

    private readonly heap: number[] = []

    private leftChild(index: number): number {
        return 2 * index + 1
    }

    private rightChild(index: number): number {
        return 2 * index + 2
    }

    private parent(index: number): number {
        return Math.floor((index - 1) / 2)
    }

    private swap(indexLeft: number, indexRight: number): void {
        [this.heap[indexLeft], this.heap[indexRight]] = [this.heap[indexRight], this.heap[indexLeft]]
    }

    private sinkDown(refIndex: number): void {
        let currentIndex = refIndex
        let maxIndex = refIndex
        const size = this.heap.length

        while (true) {
            const leftChildIndex = this.leftChild(currentIndex)
            const rightChildIndex = this.rightChild(currentIndex)

            if (leftChildIndex < size && this.heap[leftChildIndex] > this.heap[maxIndex]) {
                maxIndex = leftChildIndex
            }

            if (rightChildIndex < size && this.heap[rightChildIndex] > this.heap[maxIndex]) {
                maxIndex = rightChildIndex
            }

            if (maxIndex !== currentIndex) {
                this.swap(maxIndex, currentIndex)
                currentIndex = maxIndex
            }
            else {
                return
            }
        }
    }

    insert(value: number): void {
        this.heap.push(value)

        if (this.heap.length === 1) return

        let currentIndex = this.heap.length - 1

        while(currentIndex > 0) {
            const parentIndex = this.parent(currentIndex)
            if (this.heap[parentIndex] < this.heap[currentIndex]) {
                this.swap(parentIndex, currentIndex)
                currentIndex = parentIndex
            }
            else {
                return
            }
        }
    }

    remove(): number | null {
        if (!this.heap.length) {
            return null
        }

        if (this.heap.length === 1) {
            return this.heap.pop()
        }
        const maxValue = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.sinkDown(0)
        return maxValue
    }

}

const heap = new Heap()
heap.insert(1)
heap.insert(2)
heap.insert(3)

console.log(heap.remove(), heap)

console.log(heap)
