import { Expose, Transform } from 'class-transformer';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
  firstName: string;
  lastName: string;
  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  @Expose()
  fullName: string;
  @Expose()
  isActive: boolean;
  @Expose()
  role: string;
}
