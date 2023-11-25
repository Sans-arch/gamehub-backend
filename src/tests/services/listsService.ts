import { List } from '../../app/models/ListModel';
import { ListRepository } from '../../app/repositories/ListRepository/types';
import { UserRepository } from '../../app/repositories/UserRepository/types';
import { ListService } from '../../app/services/listsService'

describe('ListsService test suite', () => {
  let mockListService: ListService;

  beforeEach(() => {
    const listDb: List[] = [
      {
        id: 1,
        description: 'My list',
        gameList: [
          {
            id: 1,
            userId: 1,
            gameId: 123,
            listId: 1,
          },
          {
            id: 2,
            userId: 1,
            gameId: 456,
            listId: 1,
          },
          {
            id: 3,
            userId: 1,
            gameId: 789,
            listId: 1,
          },
        ]
      },
      {
        id: 2,
        description: 'My list 2',
        gameList: [
          {
            id: 4,
            userId: 1,
            gameId: 123,
            listId: 2,
          },
          {
            id: 5,
            userId: 1,
            gameId: 456,
            listId: 2,
          },
          {
            id: 6,
            userId: 1,
            gameId: 789,
            listId: 2,
          },
        ]
      }
    ];

    const listRepository: ListRepository = {
      findByUserId(userId) {
        if (userId === 1) {
          return Promise.resolve<List[]>([{
            id: 1,
            description: 'My list',
            gameList: [
              {
                id: 1,
                userId: 1,
                gameId: 123,
                listId: 1,
              },
              {
                id: 2,
                userId: 1,
                gameId: 456,
                listId: 1,
              },
              {
                id: 3,
                userId: 1,
                gameId: 789,
                listId: 1,
              },
            ]
          }, {
            id: 2,
            description: 'My list 2',
            gameList: [
              {
                id: 4,
                userId: 1,
                gameId: 123,
                listId: 2,
              },
              {
                id: 5,
                userId: 1,
                gameId: 456,
                listId: 2,
              },
              {
                id: 6,
                userId: 1,
                gameId: 789,
                listId: 2,
              },
            ]
          }]);
        }
        return Promise.resolve([]);
      },
      findByDescription(description) {
        return Promise.resolve(listDb.find(list => list.description === description) || null);
      },
      deleteById: (id: number) => {
        return Promise.resolve(id);
      },
      save(list) {
        return Promise.resolve<List>({
          id: 1,
          description: list.description,
          gameList: list.selectedGamesIds.map((gameId, index) => {
            return {
              id: index + 1,
              userId: 1,
              gameId: Number(gameId),
              listId: 1,
            };
          }),
        });
      },
    };
    const userRepository: UserRepository = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: ''
      }),
      save: jest.fn().mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: ''
      }),
      findByEmailAndPassword(email, password) {
        return Promise.resolve({
          id: 1,
          name: 'John Doe',
          email: email,
          password: password,
          created_at: new Date(),
        });
      },
    };

    mockListService = new ListService(listRepository, userRepository);
  });


  it('should return lists of the user', async () => {
    const userId = '1';
    const allLists = await mockListService.getAllListsFromUser(userId);
    expect(allLists).toHaveLength(2);
  });

  it('should create a list', async () => {
    const createdList = await mockListService.createList({
      description: 'My brand new list',
      selectedGamesIds: ['123', '456', '789'],
      userEmail: 'test@test.com'
    });

    expect(createdList).toHaveProperty('id');
    expect(createdList).toHaveProperty('gameList');
    expect(createdList).toHaveProperty('description');
    expect(createdList.gameList.length).toBeGreaterThanOrEqual(1);
    expect(createdList.description).toBe('My brand new list');
  });

  it('should not create a list with existing description', async () => {
    await expect(async () => {
      await mockListService.createList({
        description: 'My list',
        selectedGamesIds: ['123', '456', '789'],
        userEmail: 'test@test.com'
      });
    }).rejects.toThrow('This description was already used by another list. Please, try another one');
  });

  it('should delete a list by id', async () => {
    const deletedList = await mockListService.deleteList(1);
    expect(deletedList).toBe(1);
  });
});
