import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuidV4 }  from "uuid";

interface ICreateTodo{
    user_id: string ;
	title: string;
	done: boolean ;
	deadline: Date;
}

export const handler : APIGatewayProxyHandler  = async (event) => { 

        const { id : user_id} = event.pathParameters;

        const { title , deadline } = JSON.parse(event.body) as ICreateTodo;

        await document.put({
            TableName : "todos",
            Item : {
                id : uuidV4(),
                title,
                user_id,
                done : false,
                deadline,
            } 
        }).promise()

        return {
            statusCode : 201,
            body  : JSON.stringify({
                message : "Todo criada !",
            })
         }

 }
