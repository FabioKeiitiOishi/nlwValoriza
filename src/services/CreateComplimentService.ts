import { getCustomRepository } from "typeorm"
import { CompliementRepository } from "../repositories/ComplimentRepository"
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
  tagId: string;
  userSender: string;
  userReceiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({tagId, userSender, userReceiver, message}: IComplimentRequest) {
    const complimentRepository = getCustomRepository(CompliementRepository);
    const userRepository = getCustomRepository(UserRepository);

    if (userSender === userReceiver) {
      throw new Error('User cannot send compliment for yourself!');
    }

    const userReceiverExists = await userRepository.findOne(userReceiver);

    if (!userReceiverExists) {
      throw new Error('User receiver does not exists!');
    }

    const compliment = complimentRepository.create({
      tagId,
      userSender,
      userReceiver,
      message
    });
    
    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService }