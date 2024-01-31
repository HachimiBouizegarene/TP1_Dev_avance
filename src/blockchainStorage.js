import {readFile, writeFile} from 'node:fs/promises'
import {getDate, monSecret} from "./divers.js";
import {v4 as uuidv4} from 'uuid'
import {NotFoundError} from "./errors.js";
import {createHash} from 'node:crypto'


/* Chemin de stockage des blocks */
const path = 'src/data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    return JSON.parse(await readFile(path, 'utf8'))
}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {
    // A coder
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const blocks = await findBlocks();
    if (blocks.length > 0)
        return blocks[blocks.length -1]
    return null;
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    // le nouveau bloc a ajouter
    const id = uuidv4();
    const newBlock = {id : id}
    newBlock.nom = contenu.nom
    newBlock.don = contenu.don
    newBlock.date = getDate()

    //tous les anciens blocks
    const blocks = await findBlocks()

    // ajouter le hash si necessaire
    const lastBlock = await findLastBlock()
    let lastBlockHash = null
    if(lastBlock !== null){
        lastBlockHash = createHash('sha256').update(JSON.stringify(lastBlock)).digest('hex')
        newBlock.hash = lastBlockHash
    }

    //ajouter le nouveau bloc
    blocks.push(newBlock)

    //ecrire les nouveaux blocs dans le fichier json
    writeFile(path, JSON.stringify(blocks))
}

