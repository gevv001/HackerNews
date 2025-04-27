export const deleteItem = async (req, res) => {
    await req.item.deleteOne();
    res.status(200).json({ message: "Deleted Successfully" })
}