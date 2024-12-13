import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm'
import { DimGoldPriceDTO } from '../../../domain/dtos/DimGoldPrice/DimGoldPrice'
import { GoldPriceDTO } from '../../../domain/dtos/GoldPrice/GoldPrice'
import { DataWarehouse } from '../../database/typeorm/data_source'
import { getCurrentTimestamp } from '../../utils/getCurrentTimestamp'

const MAX_TIMESTAMP = new Date('2100-12-31T00:00:00')

@EventSubscriber()
export class GoldPriceEventSubscriber
  implements EntitySubscriberInterface<GoldPriceDTO>
{
  /**
   * Indicates that this subscriber only listen to GoldPrice events.
   */
  listenTo() {
    return GoldPriceDTO
  }

  /**
   * Called after gold price insertion.
   */
  async afterInsert(event: InsertEvent<GoldPriceDTO>) {
    const { goldType, askPrice, bidPrice } = event.entity
    const dimGoldPriceRepository = DataWarehouse.getRepository(DimGoldPriceDTO)

    await dimGoldPriceRepository.save({
      goldType: goldType,
      bidPrice: bidPrice,
      askPrice: askPrice,
      effTime: getCurrentTimestamp(),
      expTime: MAX_TIMESTAMP,
    })
  }

  /**
   * Called after gold price update.
   */
  async afterUpdate(event: UpdateEvent<GoldPriceDTO>) {
    const { goldType, askPrice, bidPrice } = event.entity!
    const dimGoldPriceRepository = DataWarehouse.getRepository(DimGoldPriceDTO)

    const currentTimeStamp = getCurrentTimestamp()

    const result = await dimGoldPriceRepository
      .createQueryBuilder()
      .update(DimGoldPriceDTO)
      .set({
        expTime: currentTimeStamp,
      })
      .where('goldType = :goldType AND expTime = :expTime', {
        goldType: goldType,
        expTime: MAX_TIMESTAMP,
      })
      .returning(['goldType', 'askPrice', 'bidPrice'])
      .updateEntity(true)
      .execute()
    const goldPrice = result.raw[0]

    await dimGoldPriceRepository.save({
      goldType: goldPrice['gold_type'],
      askPrice: askPrice ?? goldPrice['ask_price'],
      bidPrice: bidPrice ?? goldPrice['bid_price'],
      effTime: new Date(currentTimeStamp.getTime() + 1000),
      expTime: MAX_TIMESTAMP,
    })
  }

  /**
   * Called after gold price delete.
   */
  async afterRemove(event: RemoveEvent<GoldPriceDTO>) {
    const dimGoldPriceRepository = DataWarehouse.getRepository(DimGoldPriceDTO)

    const currentTimeStamp = getCurrentTimestamp()

    await dimGoldPriceRepository
      .createQueryBuilder()
      .update(DimGoldPriceDTO)
      .set({
        expTime: currentTimeStamp,
      })
      .where('goldType = :goldType AND expTime > :expTime', {
        goldType: event.entityId,
        expTime: currentTimeStamp,
      })
      .updateEntity(true)
      .execute()
  }
}
