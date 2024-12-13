import { In } from 'typeorm'
import { IContactRepository } from '../../../app/repositories/Contact'
import { ContactDTO } from '../../../domain/dtos/Contact/Contact'
import { IContactInRequestDTO } from '../../../domain/dtos/Contact/ContactIn'
import { IContactOutRequestDTO } from '../../../domain/dtos/Contact/ContactOut'
import { ICreateContactRequestDTO } from '../../../domain/dtos/Contact/CreateContact'
import { IUpdateContactRequestDTO } from '../../../domain/dtos/Contact/UpdateContact'
import { PaginationDTO } from '../../../domain/dtos/Pagination'
import { AppDataSource } from '../../database/typeorm/data_source'

/**
 * Typeorm implementation of the contact repository.
 * @class
 * @implements {IContactRepository}
 */
export class ContactRepository implements IContactRepository {
  /**
   * Creates a new contact.
   * @async
   * @param {ICreateContactRequestDTO} data - The contact data.
   * @returns {Promise<IContactOutRequestDTO>} The created contact.
   */
  async create(data: ICreateContactRequestDTO): Promise<IContactOutRequestDTO> {
    const contactRepository = AppDataSource.getRepository(ContactDTO)
    const contact = contactRepository.create(data)
    const results = await contactRepository.save(contact)
    return results
  }

  /**
   * Updates a contact with new data.
   * @async
   * @param {IContactOutRequestDTO} contact - The contact to update.
   * @param {IUpdateContactRequestDTO} data - The updated contact data.
   * @returns {Promise<IContactOutRequestDTO>} The updated contact.
   */
  async update(
    contact: IContactOutRequestDTO,
    data: IUpdateContactRequestDTO
  ): Promise<IContactOutRequestDTO> {
    const contactRepository = AppDataSource.getRepository(ContactDTO)
    const updatedContact = await contactRepository
      .createQueryBuilder('contact')
      .update(ContactDTO)
      .set(data)
      .where('id = :id', { id: contact.id })
      .returning([
        'id',
        'name',
        'phoneType',
        'phone',
        'description',
        'updatedAt',
      ])
      .updateEntity(true)
      .execute()
    return updatedContact.raw[0]
  }

  /**
   * Deletes a contact by ID.
   * @async
   * @param {number} id - The ID of the contact to delete.
   * @returns {Promise<void>} The promise that resolves when the contact is deleted.
   */
  async delete(id: number): Promise<void> {
    const contactRepository = AppDataSource.getRepository(ContactDTO)
    await contactRepository.delete({ id: id })
  }

  /**
   * Finds a contact by ID.
   * @async
   * @param {number} id - The ID of the contact to find.
   * @returns {Promise<IContactInRequestDTO|unknown>} The found contact or undefined.
   */
  async findById(id: number): Promise<IContactInRequestDTO | unknown> {
    const contactRepository = AppDataSource.getRepository(ContactDTO)
    const contact = await contactRepository.findOneBy({
      id: id,
    })
    return contact
  }

  /**
   * Finds a contact by ID list.
   * @async
   * @param {number[]} idList - The ID of the contacts to find.
   * @returns {Promise<IContactInRequestDTO|unknown>} The found contact list or undefined.
   */
  async findByIds(idList: number[]): Promise<IContactInRequestDTO[]> {
    const contactRepository = AppDataSource.getRepository(ContactDTO)
    const contacts = await contactRepository.find({
      where: { id: In(idList) },
      order: { name: 'ASC' },
      select: {
        id: true,
        name: true,
        phoneType: true,
        phone: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return contacts
  }

  /**
   * Retrieves the list of search data.
   * @async
   * @returns {IContactInRequestDTO} The list of search data.
   */
  async findAllSearchData(): Promise<IContactInRequestDTO[]> {
    const contactRepository = AppDataSource.getRepository(ContactDTO)
    const contacts = await contactRepository.find({
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        name: true,
      },
      cache: 10 * 60 * 1000,
    })

    return contacts
  }

  /**
   * Retrieves the paginated list of contacts.
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of contacts.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 25

    const contactRepository = AppDataSource.getRepository(ContactDTO)
    const [contacts, total] = await contactRepository.findAndCount({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        name: true,
        phoneType: true,
        phone: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      cache: 10 * 60 * 1000,
    })

    return {
      body: contacts,
      total: total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }
}
