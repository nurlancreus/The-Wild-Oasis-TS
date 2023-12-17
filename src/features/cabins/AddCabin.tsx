import { Modal, Button } from "@/ui";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;

// function AddCabin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsModalOpen((prev) => !prev)}>
//         Add new cabin
//       </Button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default AddCabin;
