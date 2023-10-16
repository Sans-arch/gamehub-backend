interface CreateListProps {
  description: string;
}

export async function getAllListsFromUser() {
  return [];
}

export async function createList({ description }: CreateListProps): Promise<any> {
  console.log(description);

  return {
    description
  };
}
