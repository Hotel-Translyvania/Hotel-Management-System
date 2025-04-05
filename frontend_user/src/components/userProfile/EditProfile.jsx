import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import api from "@/api";

export default function EditProfile(props) {
    const {data} = props;
    const {open, isOpen} = props;
  
    const {lname,fname,image,contact_information :{phone, email, address :{street, country, city}, passport}} = data;
  const [userData, setUserData] = React.useState({
    lname: lname,
    fname: fname,
    phone: phone,
    email: email,
    street: street,
    country: country,
    city: city,
    passport: passport,
    image:image,
    
  });

  
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    props.opeE; 
  };
  const handleClose = () => console.log(isOpen());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUserData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <React.Fragment>
      
      <Dialog open={true} onClose={handleClose}>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            {/* Profile Image Section */}
            <Box position="relative" textAlign="center">
              <img
                src={userData.image}
                alt="User"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "white",
                }}
              >
                <PhotoCamera />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </IconButton>
            </Box>

            {/* Form Fields */}
            <Box display="grid" gridTemplateColumns={{ md: "1fr 1fr" }} gap={2}>
              <TextField
                label="First Name"
                name="fname"
                variant="outlined"
                value={userData.fname}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                name="lname"
                variant="outlined"
                value={userData.lname}
                onChange={handleChange}
              />
              <TextField
                label="Phone Number"
                name="phone"
                variant="outlined"
                value={userData.phone
                }
                onChange={handleChange}
              />
              <TextField
                label="Country"
                name="country"
                variant="outlined"
                value={userData.country}
                onChange={handleChange}
              />
              <TextField
                label="City"
                name="city"
                variant="outlined"
                value={userData.city}
                onChange={handleChange}
              />
              <TextField
                label="Street"
                name="street"
                variant="outlined"
                value={userData.street}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
