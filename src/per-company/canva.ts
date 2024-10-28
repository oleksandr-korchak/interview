interface IPowerGrid {

    /**
     * Registers a power plant to the grid.
     * @return  power plant id.
     * @param   areaIds: ids of areas that this power plant is connected to.
     * @param   capacity: maximum power this plant can provide at any given time.
     */
    addPowerPlant(areaIds: string[], capacity: number): string;

    /**
     * Tries to connect a consumer to the grid.
     * @return  consumer id if consumer is connected.
     * @param   areaId: the id of the area that the consumer lives.
     * @param   maxConsumption: the maximum consumption of this consumer.
     */
    addConsumer(areaId: string, maxConsumption: number): string;

    /** @return ids of power plants that supply power to a consumer. */
    getPowerSuppliers(consumerId: string): string[];
}

class PowerGrid implements IPowerGrid {

    consumers: {
        [consumerId: string]: {
            maxConsumption: number
            areaId: string
            plantIds: string[]
        }
    } = {}

    areas: {
        [areaId: string]: {
            consumersIds: string[]
            plantIds: string[]
        }
    } = {}

    plants: {
        [plantId: string]: {
            areasIds: string[]
            capacity: number
            leftCapacity: number
        }
    } = {}

    addPowerPlant(areasIds: string[], capacity: number): string {
        const id: string = '123' + (Math.random() * 1000).toString()

        this.plants[id] = {
            areasIds,
            capacity,
            leftCapacity: capacity,

        }
        return id
    }

    addConsumer(areaId: string, maxConsumption: number): string {
        const consumerId: string = '123' + (Math.random() * 1000).toString()

        const plantIdsConnectedToArea = this.areas[areaId].plantIds
        const leftCapacity = plantIdsConnectedToArea
            .reduce(
                (acc, plantId) => acc + this.plants[plantId].leftCapacity,
                0,
            )

        if (maxConsumption > leftCapacity) {
            throw new Error('')
        }

        this.consumers[consumerId] = {
            maxConsumption,
            areaId,
            plantIds: plantIdsConnectedToArea,
        }

        this.areas[areaId].consumersIds.push(consumerId)
        this.areas[areaId].plantIds.push(consumerId)

        return consumerId


    }

    getPowerSuppliers(consumerId: string): string[] {
        if (!consumerId) {
            return null
        }

        return []
    }



}
