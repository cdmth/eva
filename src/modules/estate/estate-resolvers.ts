import Estate from './estate-model';

const resolvers = {
  Query: {
    estates() {
      return Estate.find({})
    }
  }
};

export default resolvers;