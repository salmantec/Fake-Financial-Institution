import SeedRepo from "./repo";

export default class SeedService {
  static getAllAccountTypes = async () => SeedRepo.getAllAccountTypes();
  static getAllBanks = async () => SeedRepo.getAllBanks();
  static getAllTransactionTypes = async () => SeedRepo.getAllTransactionTypes();
}
