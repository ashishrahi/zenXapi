import {Router} from 'express'
const router = Router()
import {supplierController} from '../controllers/index'


router.post('/', supplierController.createSupplierController)
router.put('/:id', supplierController.updateSupplierController )
router.get('/', supplierController.getSupplierController )
router.get('/:id', supplierController.detailSupplierController )
router.delete('/', supplierController.deleteSupplierController )

export default router
