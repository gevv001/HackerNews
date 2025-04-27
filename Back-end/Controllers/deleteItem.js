export const deleteItem = async (req, res) => {
    try {
        await req.item.deleteOne();
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error while deleting"})
    }
}