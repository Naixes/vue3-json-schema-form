import { CustomKeyword } from "../../lib";

const keyword: CustomKeyword = {
    definition: {
        keyword: 'test',
        macro: () => {
            return {
                minLength: 10
            }
        }
    },
    transformSchema(schema) {
        return {
            ...schema,
            minLength: 10
        }
    }
}

export default keyword