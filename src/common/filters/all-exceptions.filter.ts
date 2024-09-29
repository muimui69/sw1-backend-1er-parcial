import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        if (gqlHost) {
            return new ApolloError(exception.message, 'INTERNAL_SERVER_ERROR');
        }
    }
}
