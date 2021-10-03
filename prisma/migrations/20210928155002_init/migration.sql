-- RenameIndex
ALTER INDEX "ApiNames_api_name_key" RENAME TO "ApiNames.api_name_unique";

-- RenameIndex
ALTER INDEX "QueueTypes_queue_type_key" RENAME TO "QueueTypes.queue_type_unique";

-- RenameIndex
ALTER INDEX "Status_status_key" RENAME TO "Status.status_unique";

-- RenameIndex
ALTER INDEX "UserEmail_email_key" RENAME TO "UserEmail.email_unique";

-- RenameIndex
ALTER INDEX "UserEmail_user_id_key" RENAME TO "UserEmail.user_id_unique";

-- RenameIndex
ALTER INDEX "UserPhone_phone_number_key" RENAME TO "UserPhone.phone_number_unique";

-- RenameIndex
ALTER INDEX "UserPhone_user_id_key" RENAME TO "UserPhone.user_id_unique";

-- RenameIndex
ALTER INDEX "UserRole_user_id_idx" RENAME TO "UserRole.user_id_index";

-- RenameIndex
ALTER INDEX "UserRole_user_role_user_id_key" RENAME TO "unique_roles";

-- RenameIndex
ALTER INDEX "UserRoleType_user_role_key" RENAME TO "UserRoleType.user_role_unique";

-- RenameIndex
ALTER INDEX "Users_username_key" RENAME TO "Users.username_unique";
