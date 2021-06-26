import { Repository, EntityRepository } from 'typeorm';
import { Compliment } from '../entities/Compliment';

@EntityRepository(Compliment)
class CompliementRepository extends Repository<Compliment> {}

export { CompliementRepository }