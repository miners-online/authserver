import type React from "react"
import { Grid, Column, Tile, TextInput, Button } from "@carbon/react"
import { User } from "@carbon/icons-react"
import { Layer } from "@carbon/react"

interface UserProfileProps {
  firstName: string
  lastName: string
  photo: string
  email: string
  id: string
  editable?: boolean
}

const UserProfile: React.FC<UserProfileProps> = ({ firstName, lastName, photo, email, id, editable = false}) => {
  return (
    <Grid className="user-profile">
      <Column lg={16} md={8} sm={4}>
        <Tile className="user-profile__tile">
          <div className="user-profile__header">
            <div className="user-profile__photo-container">
              {photo ? (
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`${firstName} ${lastName}`}
                  className="user-profile__photo"
                />
              ) : (
                <div className="user-profile__photo user-profile__photo--placeholder">
                  <User size={32} />
                </div>
              )}
            </div>
          </div>
          <h1 className="user-profile__name">{`${firstName} ${lastName}`}</h1>
          <Layer>
            <form>
              <div className="user-profile__fields">
                { editable ? (
                  <>
                    <TextInput id="firstName" labelText="First Name" value={firstName} />
                    <TextInput id="lastName" labelText="Last Name" value={lastName} />
                  </>
                ) : (
                  <>
                    <TextInput id="firstName" labelText="First Name" value={firstName} readOnly />
                    <TextInput id="lastName" labelText="Last Name" value={lastName} readOnly />
                  </>
                )}
                <TextInput id="email" labelText="Email" value={email} readOnly />
                <TextInput id="userId" labelText="User ID" value={id} readOnly />
                <Button type="submit">Update details</Button>
              </div>
            </form>
          </Layer>
        </Tile>
      </Column>
    </Grid>
  )
}

export default UserProfile

