import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { CompliementRepository } from "../repositories/ComplimentRepository"

class ListUserSentComplimentsService {
  async execute(user_id: string) {
    const complimentRepository = getCustomRepository(CompliementRepository);

    const compliments = await complimentRepository.find({
      where: {
        userSender: user_id
      },
      relations: ['user_receiver','user_sender','tag']
    });

    return classToPlain(compliments);
  }
}

export { ListUserSentComplimentsService }