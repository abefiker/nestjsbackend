// import React from 'react';

// function UpdateModal (props){

// //   handleChange = (event) => {
// //     this.setState({ inputValue: event.target.value });
// //   };

// //   handleSubmit = (event) => {
// //     event.preventDefault();
// //     const { inputValue } = this.state;
// //     // Perform update logic with the updated value
// //     console.log('Updated value:', inputValue);
// //     // Close the modal
// //     this.props.onClose();
// //   };

  
//     const { open, onClose } =props;
//     // const { inputValue } = this.state;


//     return (
//   <>
//     {open ?}
//       <div className="modal-overlay">
//         <div className="modal">
//           <div className="modal-header">
//             <h1 className="modal-title">Update Modal</h1>
//             <button className="modal-close" onClick={onClose}>
//               &times;
//             </button>
//           </div>
//           <div className="modal-content">
//             <form onSubmit={this.handleSubmit}>
//               <label>
//                 New Value:
//                 <input type="text" value={inputValue} onChange={this.handleChange} />
//               </label>
//               <button type="submit">Update</button>
//             </form>
//           </div>
//         </div>
//       </div>
//   </>
//     );
//   }


// export default UpdateModal;