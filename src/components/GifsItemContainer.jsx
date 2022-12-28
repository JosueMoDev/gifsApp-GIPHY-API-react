import { AddToFavorite, CopyToClipBoardButton, NoSearchRosultFound } from "./";
import { useGetItemById, useGetResposeBySearchTerm } from '../hooks';
import { useNavigate } from "react-router-dom";
import { ImageList, ImageListItem } from "@mui/material";

export const GifsItemContainer = () => {
    const { searchTerm, gifs, isSearching } = useGetResposeBySearchTerm();
    const { startShowingitem } = useGetItemById();
    const navigate = useNavigate();
    
    return (
        <>
            {(gifs.length > 0)
                ? 
                <ImageList variant="masonry" cols={4} gap={16} sx={{ pt:4, width:'100%', columnCount:{xs: '2 !important',  md: '3 !important', lg: '4 !important'}}}>
                    {gifs.map(gif => (
                        <ImageListItem key={gif.id}>
                            <div className='animate__animated animate__fadeIn'>
                                <img
                                    src={`${gif.url}?w=248&fit=crop&auto=format`}
                                    alt={gif.title}
                                    loading="lazy"
                                    onClick={() => {               
                                        startShowingitem({ id:gif.id, name: gif.title, user:gif.user })
                                        navigate(`${gif.slug}`);
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4,
                                        borderTopLeftRadius: 4,
                                        borderTopRightRadius: 4,
                                        display: 'block',
                                        height: '100%',
                                        width:'100%'
                                        
                                    }}
                                />
                                <div className=' hidden absolute top-0 right-0 sm:right-2 sm:p-1 sm:flex'>
                                    <CopyToClipBoardButton itemData={ gif }/>
                                    <AddToFavorite itemData={{ item: gif, size: 1.1}}/>
                                </div>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>
                : (!isSearching)&&<NoSearchRosultFound searchTerm={searchTerm} />
                        
            }
        </>
  )
}