import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import ApiError from '../../../error/ApiError'
import { xLanguages } from '../../../global/constant'
import User from '../user/user.mode'
import { iExpertise, iExpertiseModel } from './expertise.interface'

const expertiseSchema = new Schema<iExpertise, iExpertiseModel>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    mentor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    hourly_rates: [{ type: Number }],
    languages: [{ type: String, enum: xLanguages }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

expertiseSchema.pre('save', async function (next) {
  const isMentorRole = await User.count({
    $and: [{ _id: this.mentor }, { role: 'mentor' }]
  })

  if (!isMentorRole) throw new ApiError(httpStatus.BAD_REQUEST, 'Mentor _id not valid')

  const isCategoryAlreadyCreated = await Expertise.count({
    $and: [{ category: this.category }, { mentor: this.mentor }]
  })

  if (isCategoryAlreadyCreated) throw new ApiError(httpStatus.BAD_REQUEST, 'This expertise already created')

  next()
})

const Expertise = model<iExpertise, iExpertiseModel>('Expertise', expertiseSchema)

export default Expertise
