import { NoSearchRosultFound } from "./NoSearchRosultFound";
import { AddToFavorite, CopyToClipBoardButton } from './';
import { useGetItemById, useGetResposeBySearchTerm } from "../hooks";
import { useNavigate } from "react-router-dom";
import { ImageList, ImageListItem } from "@mui/material";


export const StickersItemContainer = () => {
    const { searchTerm, stickers } = useGetResposeBySearchTerm();
    const { startShowingitem } = useGetItemById();
    const navigate = useNavigate();
    
    
    return (
        <>
        {(stickers.length>0)
                ?
                <ImageList variant="masonry" cols={4} gap={16} sx={{ pt:8, width:'98%', columnCount:{xs: '2 !important',  md: '3 !important', lg: '4 !important'}}}>
                    {stickers.map(sticker => (
                        <ImageListItem key={sticker.id}>
                            <div className="flex flex-wrap">
                                <img
                                    src={`${sticker.url}?w=248&fit=crop&auto=format`}
                                    alt={sticker.title}
                                    loading="lazy"
                                    onClick={() => {               
                                        startShowingitem({ id:sticker.id, name: sticker.title, user:sticker.user })
                                        navigate(`${sticker.slug}`);
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4,
                                        borderTopLeftRadius: 4,
                                        borderTopRightRadius: 4,
                                        display: 'block',
                                        height: '100%',
                                        width: '100%',
                                        backgroundColor: 'transparent',
                                        opacity: 0.8,
                                        backgroundImage:  'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #111827 25%, #111827 75%, #000 75%, #000)',
                                        backgroundPosition: '0 0, 35px 35px',
                                        backgroundSize: '70px 70px'
                                        
                                    }}
                                />
                                <div className='hidden absolute top-0 right-0 sm:right-2 sm:p-1 sm:flex '>
                                    <CopyToClipBoardButton itemData={ sticker }/>
                                    <AddToFavorite itemData={{ item: sticker, size: 1.1}}/>
                                </div>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>     
                :< NoSearchRosultFound searchTerm={searchTerm} />
        }
    </>
    )
}