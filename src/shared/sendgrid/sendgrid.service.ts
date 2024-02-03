import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

import { ENV } from '@common/constants';
import { Environment } from '@shared/types';

@Injectable()
export class SendgridService {
  private readonly logger = new Logger(SendgridService.name);

  constructor(configService: ConfigService<Environment>) {
    SendGrid.setApiKey(configService.getOrThrow(ENV.SENDGRID_API_KEY));
  }

  async send(msg: SendGrid.MailDataRequired) {
    const clientResponse = await SendGrid.send(msg);
    this.logger.log(
      `Email sent to ${msg.to} with status ${clientResponse[0].statusCode}`,
    );
    return clientResponse;
  }
}
