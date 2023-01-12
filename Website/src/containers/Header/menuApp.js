export const adminMenu = [
    { //hệ thống quản lý người dùng
        name: 'menu.admin.manage-user',


        menus: [

            {
                name: 'menu.admin.crud', link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux  ' },

                // ]
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-admin',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux  ' },

                // ]
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux  ' },

                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux  ' },

                // ]
            },

            {
                name: 'menu.doctor.menu-schedule', link: '/system/doctor/manage-schedule/doctor/manage-schedule',

            },


            {
                name: 'menu.doctor.doctor-infor', link: '/system/doctor/dr-information',

            },


        ]
    },

    {
        //hệ thống quản lý chuyên khoa

        name: 'menu.admin.manage-specialty',
        menus: [

            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialist'

            },


            {
                name: 'menu.admin.manage-listSpecialty', link: '/system/manage-specialist-information'

            }

        ]
    },

    {
        //hệ thống quản lý phòng khám
        name: 'menu.admin.manage-clinic',

        menus: [

            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinics'

            },
            {
                name: 'menu.admin.manage-listClinic', link: '/system/manage-inform-clinics'

            }



        ]
    },

    // { //hệ thống quản lý phòng khám
    //     name: 'menu.admin.manage-handbook',


    //     menus: [

    //         {
    //             name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'

    //         }

    //     ]
    // },
];

export const DoctorMenu = [

    {
        name: 'menu.admin.manage-user',
        menus: [

            {
                name: 'menu.doctor.information', link: '/doctor/dr-manage-information-spe',
            },
            {
                name: 'menu.doctor.inforspecialist', link: '/doctor/manage-information',
            },
            {
                name: 'menu.doctor.menu-schedule', link: '/doctor/dr-manage-schedule',
            },

            {
                name: 'menu.doctor.listpatient', link: '/doctor/dr-manage-list-patient',
            },





        ]
    }

];