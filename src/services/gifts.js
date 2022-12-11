export const getGifts = async () => {
  return JSON.parse(localStorage.getItem("Gifts")) ?? [];
};

export const setGifts = async (gifts) => {
  try {
    localStorage.setItem("Gifts", JSON.stringify(gifts));
    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 500,
      info: `can't create gift`,
      message: { ...error },
    };
  }
};

export const deleteGift = async (gifts, gift_to_delete) => {
  try {
    const newGiftsList = gifts.filter((gf) => gf.id !== gift_to_delete.id);
    localStorage.setItem("Gifts", JSON.stringify(newGiftsList));
    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 500,
      info: `can't delete gift with id ${gift_to_delete.id}`,
      message: { ...error },
    };
  }
};

export const updateGift = async (gifts, gift_to_update) => {
  try {
    const newGiftsList = gifts
      .filter((gf) => gf.id !== gift_to_update.id)
      .concat([gift_to_update]);
    localStorage.setItem("Gifts", JSON.stringify(newGiftsList));
    return {
      status: 200,
    };
  } catch (error) {
    return {
      status: 500,
      info: `can't update gift with id ${gift_to_update.id}`,
      message: { ...error },
    };
  }
};
